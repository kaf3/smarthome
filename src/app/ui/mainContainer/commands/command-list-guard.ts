import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, race } from 'rxjs';
import { CommandListFacade } from '@store/command-list';
import { map, take } from 'rxjs/operators';
import { ErrorState, LoadingState } from '@models/error-loading';

@Injectable()
export class CommandListGuard implements CanActivate {
	constructor(private readonly commandListFacade: CommandListFacade) {}

	canActivate(): Observable<boolean> {
		this.commandListFacade.loadCommandList();
		return race(this.commandListFacade.loaded$, this.commandListFacade.error$).pipe(
			take(1),
			map(
				(result: ErrorState['errorMsg'] | LoadingState.LOADED) =>
					result === LoadingState.LOADED,
			),
		);
	}
}
