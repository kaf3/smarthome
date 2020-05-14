import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipmentFacade } from '@store/equipment';
import { RoomFacade } from '@store/room';
import { RoomListFacade } from '@store/room-list';
import { map, withLatestFrom } from 'rxjs/operators';
import { Room } from '@models';

@Injectable()
export class RoomGuard implements CanDeactivate<unknown> {
	constructor(
		private readonly roomFacade: RoomFacade,
		private readonly roomListFacade: RoomListFacade,
		private readonly equipmentFacade: EquipmentFacade,
	) {}

	canDeactivate(
		_component?: unknown,
		_currentRoute?: ActivatedRouteSnapshot,
		_currentState?: RouterStateSnapshot,
		_nextState?: RouterStateSnapshot,
	): Observable<boolean> | boolean {
		return this.roomFacade.room$.pipe(
			withLatestFrom(this.equipmentFacade.equipment$),
			map(([room, activeEquipment]) => {
				if (!!activeEquipment.id) {
					const newRoom: Room = { ...room };
					newRoom.activeEquipment = activeEquipment;
					this.roomListFacade.upsertRoomWhenLeft(newRoom);
				}
				return true;
			}),
		);
	}
}
