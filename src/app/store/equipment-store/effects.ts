import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentActions, GetEquipment, GetEquipmentSuccess } from './actions';
import { of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { RoomFacade } from '@store/room';

@Injectable()
export class EquipmentEffects {
	getEquipment$ = createEffect(() =>
		this.actions$.pipe(
			ofType<GetEquipment>(EquipmentActions.getEquipment),
			map((action) => action.payload.id),
			switchMap((id) => this.roomFacade.equipmentById$(id)),
			filter((equipment) => !!equipment),
			switchMap((equipment) => of(new GetEquipmentSuccess({ equipment }))),
		),
	);

	constructor(private readonly actions$: Actions, private readonly roomFacade: RoomFacade) {}
}
