import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipmentFacade } from '@store/equipment';

import { map, take, withLatestFrom } from 'rxjs/operators';
import { Room } from '@models';
import { RoomFacade } from '@store/room';

@Injectable()
export class RoomGuard implements CanDeactivate<unknown> {
	constructor(
		private readonly roomFacade: RoomFacade,
		private readonly equipmentFacade: EquipmentFacade,
	) {}

	canDeactivate(
		_component?: unknown,
		_currentRoute?: ActivatedRouteSnapshot,
		_currentState?: RouterStateSnapshot,
		_nextState?: RouterStateSnapshot,
	): Observable<boolean> {
		const room$ = this.roomFacade.roomName$.pipe(
			take(1),
			withLatestFrom(this.roomFacade.equipmentList$),
			map(([roomName, equipment]) => ({ roomName, equipment } as Room)),
		);

		return room$.pipe(
			withLatestFrom(this.equipmentFacade.equipment$),
			map(([room, activeEquipment]) => {
				this.roomFacade.upsertRoomSuccess(room, activeEquipment);
				return true;
			}),
		);
	}
}
