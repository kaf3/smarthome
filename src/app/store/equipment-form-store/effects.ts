import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentFormActions, SubmitEquipmentForm } from './actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { Equipment } from '@models/equipment';
import { EquipmentFacade } from '@store/equipment';
import { EquipmentFormFacade } from './facade';
import { HardwareStoreActions } from '@store/hardware';

@Injectable()
export class EquipmentFormEffects {
	/*	loadEquipmentForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType<LoadEquipmentForm>(EquipmentFormActions.loadEquipmentForm),
			switchMap(() =>
				this.equipmentFacade.equipment$.pipe(
					filter((equipment) => !!equipment.id),
					map((equipment) => new LoadEquipmentFormSuccess({ equipment })),
				),
			),
		),
	);*/

	submitEquipmentForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType<SubmitEquipmentForm>(EquipmentFormActions.submitEquipmentForm),
			withLatestFrom(this.equipmentFormFacade.equipmentFormState$),
			map(([action, fs]) => {
				let equipment = new Equipment({
					...action.payload.equipment,
					value: action.payload.equipment.value,
				});
				equipment.name = fs.value.name;
				equipment = Equipment.setValue(equipment, fs.value?.value);
				console.log(equipment);
				return new HardwareStoreActions.UpdateOneEquipment({ equipment });
			}),
		),
	);

	constructor(
		private readonly actions$: Actions,
		private readonly equipmentFacade: EquipmentFacade,
		private readonly equipmentFormFacade: EquipmentFormFacade,
	) {}
}
