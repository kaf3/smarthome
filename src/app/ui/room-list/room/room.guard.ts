import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomFacade } from '@store/room';
import { RoomListFacade } from '@store/room-list';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { Room } from '@models/room';
import { HardwareFacade } from '@store/hardware';

@Injectable()
export class RoomGuard implements CanDeactivate<unknown> {
	constructor(
		private readonly roomFacade: RoomFacade,
		private readonly roomListFacade: RoomListFacade,
		private readonly hardwareFacade: HardwareFacade,
	) {}

	canDeactivate(
		_component?: unknown,
		_currentRoute?: ActivatedRouteSnapshot,
		_currentState?: RouterStateSnapshot,
		_nextState?: RouterStateSnapshot,
	): Observable<boolean> | boolean {
		return this.roomFacade.room$.pipe(
			withLatestFrom(this.hardwareFacade.hardware$),
			map(([room, activeHardware]) => {
				if (!!activeHardware.id) {
					this.roomListFacade.upsertRoomWhenLeft(new Room({ ...room, activeHardware }));
				}
				return true;
			}),
			take(1),
		);
	}
}
