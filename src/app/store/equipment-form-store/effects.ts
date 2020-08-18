import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';
import { Equipment } from '@models/equipment';
import { HardwareStoreActions } from '@store/hardware';
import { RoomListFacade } from '@store/room-list';
import { Hardware } from '@models/hardware';
import { Room } from '@models/room';
import { EquipmentFormFacade } from './facade';
import { EquipmentFormActionTypes, SubmitEquipmentForm } from './actions';

@Injectable()
export class EquipmentFormEffects {
	submitEquipmentForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType<SubmitEquipmentForm>(EquipmentFormActionTypes.submitEquipmentForm),
			withLatestFrom(
				this.equipmentFormFacade.equipmentFormState$,
				this.roomListFacade.room$,
				this.roomListFacade.hardware$,
			),
			map(([action, fs, room, hardware]) => {
				if (!room || !hardware) {
					return new HardwareStoreActions.UpdateOneEquipmentFailure({
						errorMsg: 'Не удалось обновить устройство',
					});
				}
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
		private readonly roomListFacade: RoomListFacade,
	) {}
}
