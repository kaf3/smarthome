import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { RoomListFacade } from '@store/room-list';

@Injectable()
export class HardwareGuard implements CanActivate {
	constructor(private readonly roomListFacade: RoomListFacade) {}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
		return this.roomListFacade.roomList$.pipe(
			map((roomList) => {
				return !!(roomList?.roomEntityState?.entities?.[route.params['id']]
					?.hardwareEntityState.ids as string[]).find(
					(id) => route.params['hardwareId'] === id,
				);
			}),
			take(1),
		);
	}
}
