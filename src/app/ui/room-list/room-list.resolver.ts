import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { RoomListFacade } from '@store/room-list';
import { EMPTY, Observable, of, race } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CallState } from '@models';

@Injectable()
export class RoomListResolver implements Resolve<any> {
	constructor(private readonly roomListFacade: RoomListFacade) {}

	resolve(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot,
	): Observable<boolean> | Promise<any> | any {
		return race(this.roomListFacade.loaded$, this.roomListFacade.error$).pipe(
			take(1),
			switchMap((result: string | CallState) => {
				return typeof result === 'string' ? EMPTY : of(true);
			}),
		);
	}
}
