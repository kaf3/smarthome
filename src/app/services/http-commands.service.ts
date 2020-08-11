import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Command, CommandDTO, CommandList, CommandListDTO } from '@models/command';
import { Dictionary } from '@ngrx/entity';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

const FIREBASE_DATABASE_URL = environment.firebaseConfig.databaseURL;

@Injectable()
export class HttpCommandsService {
	constructor(private readonly http: HttpClient, private readonly authService: AuthService) {}

	loadCommandList(): Observable<CommandList> {
		return this.authService.user$.pipe(
			take(1),
			switchMap((user) =>
				this.http
					.get<Dictionary<CommandDTO>>(
						`${FIREBASE_DATABASE_URL}/users/${user?.uid}/commands.json`,
					)
					.pipe(
						map((commandCollection) =>
							new CommandListDTO({ commandCollection }).createDomain(),
						),
					),
			),
		);
	}

	postCommand(command: Command): Observable<Command> {
		return this.authService.user$.pipe(
			take(1),
			switchMap((user) =>
				this.http
					.post<{ name: string }>(
						`${FIREBASE_DATABASE_URL}/users/${user?.uid}/commands.json`,
						Command.createDTO(command),
					)
					.pipe(map((response) => new Command({ ...command, id: response.name }))),
			),
		);
	}

	patchCommand(command: Command): Observable<Command> {
		return this.authService.user$.pipe(
			take(1),
			switchMap((user) =>
				this.http
					.put<CommandDTO>(
						`${FIREBASE_DATABASE_URL}/users/${user?.uid}/commands/${command.id}/.json`,
						Command.createDTO(command),
					)
					.pipe(
						map((commandDTO) =>
							new CommandDTO({ ...commandDTO }).createDomain(command.id, command),
						),
					),
			),
		);
	}

	deleteCommand(command: Command): Observable<{ response: null; command: Command }> {
		return this.authService.user$.pipe(
			take(1),
			switchMap((user) =>
				this.http
					.delete<null>(
						`${FIREBASE_DATABASE_URL}/users/${user?.uid}/commands/${command.id}.json`,
					)
					.pipe(map((response) => ({ response, command }))),
			),
		);
	}
}
