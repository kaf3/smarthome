import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandDTO, CommandList, CommandListDTO } from '@models/command';
import { environment } from '../../environments/environment';
import { Dictionary } from '@ngrx/entity';
import { map } from 'rxjs/operators';

const FIREBASE_DATABASE_URL = environment.firebaseConfig.databaseURL;

@Injectable()
export class HttpCommandsService {
	constructor(private readonly http: HttpClient) {}

	loadCommandList(): Observable<CommandList> {
		return this.http
			.get<Dictionary<CommandDTO>>(`${FIREBASE_DATABASE_URL}/users/user_id/commands.json`)
			.pipe(
				map((commandCollection) =>
					new CommandListDTO({ commandCollection }).createDomain(),
				),
			);
	}
}
