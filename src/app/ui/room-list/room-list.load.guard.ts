import { Injectable } from '@angular/core';
import { CanDeactivate, CanLoad } from '@angular/router';
import { EMPTY, Observable, of, race } from 'rxjs';
import { RoomListFacade } from '@store/room-list';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { RoomFacade } from '@store/room';
import { RoomList } from '@models/rooms';
import { CallState } from '@models/error-loading';

@Injectable()
export class RoomListLoadGuard implements CanLoad, CanDeactivate<unknown> {
	constructor(
		private readonly roomListFacade: RoomListFacade,
		private readonly roomFacade: RoomFacade,
	) {}

	canLoad(): Observable<boolean> {
		this.roomListFacade.loadRooms();
		return race(this.roomListFacade.loaded$, this.roomListFacade.error$).pipe(
			take(1),
			switchMap((result: string | CallState) => {
				return typeof result === 'string' ? EMPTY : of(true);
			}),
		);
	}

	canDeactivate(): Observable<boolean> {
		return this.roomListFacade.rooms$.pipe(
			withLatestFrom(this.roomFacade.room$),
			map(([rooms, activeRoom]) => {
				if (!!activeRoom.name) {
					this.roomListFacade.upsertRoomListWhenLeft(new RoomList({ rooms, activeRoom }));
				}
				return true;
			}),
		);
	}
}
