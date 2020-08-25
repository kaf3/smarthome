import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { Observable, race } from 'rxjs';
import { RoomListFacade } from '@store/room-list';
import { map, take } from 'rxjs/operators';
import { ErrorState, LoadingState } from '@models/error-loading';
import { LastVisitedService } from '@services';

@Injectable()
export class RoomListGuard implements CanActivate, CanDeactivate<unknown> {
	constructor(
		private readonly roomListFacade: RoomListFacade,
		private readonly lastVisitedService: LastVisitedService,
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
		return this.roomListFacade.room$.pipe(
			map((activeRoom) => {
				if (activeRoom?.id) {
					this.lastVisitedService.addOne('rooms', activeRoom.id);
				}
				return true;
			}),
		);
	}
}
