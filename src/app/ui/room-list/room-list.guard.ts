import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomListFacade } from '@store/room-list';
import { RoomFacade } from '@store/room';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { RoomList } from '@models';

@Injectable()
export class RoomListGuard implements CanDeactivate<unknown>, CanActivate {
	constructor(
		private readonly roomListFacade: RoomListFacade,
		private readonly roomFacade: RoomFacade,
		private readonly router: Router,
	) {}
	canDeactivate(): Observable<boolean> {
		console.log('guard');
		return this.roomListFacade.rooms$.pipe(
			withLatestFrom(this.roomFacade.room$),
			map(([rooms, activeRoom]) => {
				if (!!activeRoom.roomName) {
					this.roomListFacade.upsertRoomListWhenLeft(new RoomList({ rooms, activeRoom }));
				}
				return true;
			}),
		);
	}

	canActivate(): Observable<boolean | UrlTree> {
		console.log('activate');
		return this.roomListFacade.roomList$.pipe(
			filter((roomList) => !!roomList.rooms.length),
			take(1),
			map((roomList) => {
				const { roomName } = roomList.activeRoom;
				if (!!roomName) {
					//const url = `rooms/${roomName}`;
					//return this.router.parseUrl(url);
				}
				return true;
			}),
		);
	}
}
