import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentFormActionTypes, SubmitEquipmentForm } from './actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { Equipment } from '@models/equipment';
import { EquipmentFormFacade } from './facade';
import { HardwareFacade, HardwareStoreActions } from '@store/hardware';
import { RoomFacade } from '@store/room';
import { RoomListFacade } from '@store/room-list';
import { Hardware } from '@models/hardware';
import { Room } from '@models/room';

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
			ofType<SubmitEquipmentForm>(EquipmentFormActionTypes.submitEquipmentForm),
			withLatestFrom(
				this.equipmentFormFacade.equipmentFormState$,
				this.roomFacade.room$,
				this.hardwareFacade.hardware$,
			),
			map(([action, fs, room, hardware]) => {
				let equipment = new Equipment({
					...action.payload.equipment,
					value: action.payload.equipment.value,
				});
				equipment.name = fs.value.name;
				equipment = Equipment.setValue(equipment, fs.value?.value);
				const updatedHardware = Hardware.updateEquipment(hardware, equipment);
				const updatedRoom = Room.updateHardware(room, updatedHardware);
				return new HardwareStoreActions.UpdateOneEquipment({
					equipment,
					hardware: updatedHardware,
					room: updatedRoom,
				});
			}),
		),
	);

	constructor(
		private readonly actions$: Actions,
		private readonly equipmentFormFacade: EquipmentFormFacade,
		private readonly roomFacade: RoomFacade,
		private readonly roomListFacade: RoomListFacade,
		private readonly hardwareFacade: HardwareFacade,
	) {}
}
