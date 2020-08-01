import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { Observable, race } from 'rxjs';
import { RoomListFacade } from '@store/room-list';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { RoomFacade } from '@store/room';
import { RoomList } from '@models/room-list';
import { ErrorState, LoadingState } from '@models/error-loading';

@Injectable()
export class RoomListGuard implements CanActivate, CanDeactivate<unknown> {
	constructor(
		private readonly roomListFacade: RoomListFacade,
		private readonly roomFacade: RoomFacade,
	) {}

	canActivate(): Observable<boolean> {
		this.roomListFacade.loadRooms();
		return race(this.roomListFacade.loaded$, this.roomListFacade.error$).pipe(
			take(1),
			map(
				(result: ErrorState['errorMsg'] | LoadingState.LOADED) =>
					result === LoadingState.LOADED,
			),
		);
	}

	canDeactivate(): Observable<boolean> {
		return this.roomListFacade.roomList$.pipe(
			withLatestFrom(this.roomFacade.room$),
			map(([roomList, activeRoom]) => {
				if (!!activeRoom.name) {
					this.roomListFacade.upsertRoomListWhenLeft(
						new RoomList({ ...roomList, activeRoom }),
					);
				}
				return true;
			}),
		);
	}
}
