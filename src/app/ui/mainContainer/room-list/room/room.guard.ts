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
import { LastVisitedService } from '@services';

@Injectable()
export class RoomGuard implements CanDeactivate<unknown>, CanActivate {
	constructor(
		private readonly roomListFacade: RoomListFacade,
		private readonly lastVisitedService: LastVisitedService,
	) {}

	canDeactivate(
		_component?: unknown,
		_currentRoute?: ActivatedRouteSnapshot,
		_currentState?: RouterStateSnapshot,
		_nextState?: RouterStateSnapshot,
	): Observable<boolean> | boolean {
		return this.roomListFacade.room$.pipe(
			withLatestFrom(this.roomListFacade.hardware$),
			map(([room, activeHardware]) => {
				if (!!activeHardware?.id && room && room.id) {
					this.lastVisitedService.addOne(room.id, activeHardware.id);
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
