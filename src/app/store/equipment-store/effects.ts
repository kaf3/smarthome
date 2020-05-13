import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentActionsTypes, GetEquipment, GetEquipmentSuccess } from './actions';
import { of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { RoomFacade } from '@store/room';

@Injectable()
export class EquipmentEffects {
	getEquipment$ = createEffect(() =>
		this.actions$.pipe(
			ofType<GetEquipment>(EquipmentActionsTypes.getEquipment),
			map((action) => action.payload.id),
			switchMap((id) =>
				this.roomFacade.equipmentById$(id).pipe(
					filter((equipment) => !!equipment),
					take(1),
				),
			),
			switchMap((equipment) => of(new GetEquipmentSuccess({ equipment }))),
		),
	);

	constructor(private readonly actions$: Actions, private readonly roomFacade: RoomFacade) {}
}
