import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { EMPTY, Observable, of, race } from 'rxjs';
import { RoomListFacade } from '@store/room-list';
import { switchMap, take } from 'rxjs/operators';
import { CallState } from '@models';

@Injectable()
export class RoomListLoadGuard implements CanLoad {
	constructor(private readonly roomListFacade: RoomListFacade) {}

	canLoad(): Observable<boolean> {
		this.roomListFacade.loadRooms();
		console.log('load');
		return race(this.roomListFacade.loaded$, this.roomListFacade.error$).pipe(
			take(1),
			switchMap((result: string | CallState) => {
				return typeof result === 'string' ? EMPTY : of(true);
			}),
		);
	}
}
