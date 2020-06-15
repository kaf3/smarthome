import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanDeactivate,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoomFacade } from '@store/room';
import { RoomListFacade } from '@store/room-list';
import { filter, map, mapTo, take, withLatestFrom } from 'rxjs/operators';
import { Room } from '@models/room';
import { HardwareFacade } from '@store/hardware';

@Injectable()
export class RoomGuard implements CanDeactivate<unknown>, CanActivate {
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

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		this.roomFacade.getRoom(route.params['id']);

		return this.roomFacade.room$.pipe(
			filter((room) => !!room?.id),
			take(1),
			mapTo(true),
		);
	}
}
