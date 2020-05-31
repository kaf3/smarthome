import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentFormState } from './state';
import {
	EquipmentFormActions,
	LoadEquipmentForm,
	LoadEquipmentFormSuccess,
	SubmitEquipmentForm,
} from './actions';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Equipment } from '@models/equipment';
import { EquipmentFacade } from '@store/equipment';
import { UpsertAllRooms } from '../room-list-store/actions';
import { EquipmentFormFacade } from './facade';

@Injectable()
export class EquipmentFormEffects {
	loadEquipmentForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType<LoadEquipmentForm>(EquipmentFormActions.loadEquipmentForm),
			switchMap(() =>
				this.equipmentFacade.equipment$.pipe(
					filter((equipment) => !!equipment.id),
					map((equipment) => new LoadEquipmentFormSuccess({ equipment })),
				),
			),
		),
	);

	submitEquipmentForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType<SubmitEquipmentForm>(EquipmentFormActions.submitEquipmentForm),
			switchMap(() => this.equipmentFormFacade.equipmentFormState$.pipe(take(1))),
			switchMap((formState: EquipmentFormState) =>
				this.equipmentFacade.equipment$.pipe(
					take(1),
					map((equipment: Equipment) => {
						const eqp = new Equipment({ ...equipment, value: equipment.value });
						eqp.name = formState.value.name;
						eqp.value = formState.value.value;
						return new UpsertAllRooms({ obj: eqp });
					}),
				),
			),
		),
	);

	constructor(
		private readonly actions$: Actions,
		private readonly equipmentFacade: EquipmentFacade,
		private readonly equipmentFormFacade: EquipmentFormFacade,
	) {}
}
