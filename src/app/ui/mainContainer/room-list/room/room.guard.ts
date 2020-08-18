import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanDeactivate,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoomListFacade } from '@store/room-list';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { Room } from '@models/room';

@Injectable()
export class RoomGuard implements CanDeactivate<unknown>, CanActivate {
	constructor(private readonly roomListFacade: RoomListFacade) {}

	canDeactivate(
		_component?: unknown,
		_currentRoute?: ActivatedRouteSnapshot,
		_currentState?: RouterStateSnapshot,
		_nextState?: RouterStateSnapshot,
	): Observable<boolean> | boolean {
		return this.roomListFacade.room$.pipe(
			withLatestFrom(this.roomListFacade.hardware$),
			map(([room, activeHardware]) => {
				if (!!activeHardware?.id) {
					this.roomListFacade.upsertRoomWhenLeft(
						new Room({ ...room, activeHardware } as Room),
					);
				}
				return true;
			}),
			take(1),
		);
	}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.roomListFacade.roomList$.pipe(
			map(
				(roomList) =>
					!!(roomList.roomEntityState.ids as string[]).find(
						(id) => route.params['id'] === id,
					),
			),
			take(1),
		);
	}
}
