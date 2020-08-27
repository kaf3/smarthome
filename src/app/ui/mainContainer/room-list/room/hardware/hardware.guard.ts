import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { RoomListFacade } from '@store/room-list';

@Injectable()
export class HardwareGuard implements CanActivate {
	constructor(private readonly roomListFacade: RoomListFacade, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
		return this.roomListFacade.roomList$.pipe(
			map((roomList) => {
				const founded = !!(roomList?.roomEntityState?.entities?.[route.params['id']]
					?.hardwareEntityState.ids as string[]).find(
					(id) => route.params['hardwareId'] === id,
				);
				return (
					founded ||
					this.router.createUrlTree(['/nf'], {
						queryParams: {
							target: 'Не удалось найти такое устройство, вернитесь и попробуйте еще',
						},
					})
				);
			}),
			take(1),
		);
	}
}
