import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanDeactivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
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
		private readonly router: Router,
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

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
		return this.roomListFacade.roomList$.pipe(
			map((roomList) => {
				const founded = !!(roomList.roomEntityState.ids as string[]).find(
					(id) => route.params['id'] === id,
				);
				return (
					founded ||
					this.router.createUrlTree(['/nf'], {
						queryParams: {
							target: 'Не удалось найти такую комнату, вернитесь и попробуйте еще',
						},
					})
				);
			}),
			take(1),
		);
	}
}
