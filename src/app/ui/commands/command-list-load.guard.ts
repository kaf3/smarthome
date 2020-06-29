import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { EMPTY, Observable, of, race } from 'rxjs';
import { CommandListFacade } from '@store/command-list';
import { switchMap, take } from 'rxjs/operators';
import { CallState } from '@models/error-loading';

@Injectable()
export class CommandListLoadGuard implements CanLoad {
	constructor(private readonly commandListFacade: CommandListFacade) {}

	canLoad(
		_route: Route,
		_segments: UrlSegment[],
	): Observable<boolean> | Promise<boolean> | boolean {
		this.commandListFacade.loadCommandList();
		return race(this.commandListFacade.loaded$, this.commandListFacade.error$).pipe(
			take(1),
			switchMap((result: string | CallState) => {
				return typeof result === 'string' ? EMPTY : of(true);
			}),
		);
	}
}
