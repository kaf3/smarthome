import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { RoomListFacade } from '@store/room-list';
import { Observable } from 'rxjs';

@Injectable()
export class RoomListResolver implements Resolve<any> {
	constructor(private readonly roomListFacade: RoomListFacade) {}

	resolve(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot,
	): Observable<boolean> | Promise<any> | any {
		return true;
	}
}
