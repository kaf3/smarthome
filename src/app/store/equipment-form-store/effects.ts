import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EquipmentFormState } from './state';
import {
	EquipmentFormActions,
	LoadEquipmentForm,
	LoadEquipmentFormSuccess,
	SubmitEquipmentForm,
} from './actions';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Equipment } from '@models';
import { selectEquipmentFormState } from './selectors';
import { EquipmentStoreSelectors } from '../equipment-store';
import { UpsertAllRooms } from '../room-list-store/actions';

@Injectable()
export class EquipmentFormEffects {
	loadEquipmentForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType<LoadEquipmentForm>(EquipmentFormActions.loadEquipmentForm),
			switchMap(() =>
				this.store.select(EquipmentStoreSelectors.selectEquipment).pipe(
					filter((equipment) => !!equipment.id),
					map((equipment) => new LoadEquipmentFormSuccess({ equipment })),
				),
			),
		),
	);

	submitEquipmentForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType<SubmitEquipmentForm>(EquipmentFormActions.submitEquipmentForm),
			switchMap(() => this.store.select(selectEquipmentFormState).pipe(take(1))),
			switchMap((formState: EquipmentFormState) =>
				this.store.select(EquipmentStoreSelectors.selectEquipment).pipe(
					take(1),
					map((equipment: Equipment) => {
						const eqp = { ...equipment } as Equipment;

						eqp.name = formState.value.name;

						if (eqp.group === 'device') {
							eqp.value = formState.value.value;
						}

						return new UpsertAllRooms({ obj: eqp });
					}),
				),
			),
		),
	);

	constructor(
		private readonly actions$: Actions,
		private readonly store: Store<EquipmentFormState>,
	) {}
}
