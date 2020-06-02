import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { HardwareFormActions, HardwareFormActionTypes, LoadHardwareFormSuccess } from './actions';
import { RoomFacade } from '@store/room';
import { HardwareFacade } from '@store/hardware';
import { HardwareFormFacade } from './facade';
import { RoomListFacade, RoomListStoreActions } from '@store/room-list';
import { RoomList } from '@models/rooms';
import { Hardware } from '@models/hardware';
import { Action } from '@ngrx/store';
import { checkById } from '@helpers';

@Injectable()
export class HardwareFormEffects {
	loadHarwdareForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HardwareFormActionTypes.LoadHardwareForm),
			withLatestFrom(this.roomFacade.room$.pipe(filter((room) => !!room?.id))),
			map(([_a, room]) => room.name),
			withLatestFrom(
				this.hardwareFacade.hardware$.pipe(filter((hardware) => !!hardware?.id)),
			),
			map(
				([roomName, { name }]) =>
					new LoadHardwareFormSuccess({ value: { roomName, name } }),
			),
		),
	);

	submitHardwareForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HardwareFormActionTypes.SubmitHardwareForm),
			withLatestFrom(this.hardwareFormFacade.hardwareFormState$),
			map(([_a, formState]) => formState),
			withLatestFrom(
				this.roomListFacade.roomList$,
				this.roomFacade.room$,
				this.hardwareFacade.hardware$,
			),
			map(([formState, roomList, room, hardware]) => {
				HardwareFormEffects.check(formState.isPristine);

				const formControls = formState.controls;
				const formValue = formState.value;
				const newRoomList = new RoomList({ ...roomList });
				const oldHardware = new Hardware({ ...hardware });

				const oldRoomIndex = newRoomList.rooms.findIndex(checkById(room.id));
				HardwareFormEffects.check(oldRoomIndex);

				const hardwareIndex = newRoomList.rooms[oldRoomIndex].hardwares.findIndex(
					checkById(hardware.id),
				);
				HardwareFormEffects.check(hardwareIndex);

				if (formControls.name.isDirty) {
					oldHardware.name = formValue.name;
					newRoomList.rooms[oldRoomIndex].hardwares[hardwareIndex] = oldHardware;
				}

				if (formControls.roomName.isDirty) {
					const newRoomIndex = newRoomList.rooms.findIndex(
						(r) => r.name === formState.value.roomName,
					);
					HardwareFormEffects.check(newRoomIndex);

					HardwareFormEffects.check(
						!!newRoomList.rooms[newRoomIndex].hardwares.find(checkById(hardware.id)),
					);
					newRoomList.rooms[newRoomIndex].hardwares.push(oldHardware);
					newRoomList.rooms[oldRoomIndex].hardwares.splice(hardwareIndex, 1);
				}

				return RoomListStoreActions.UpsertRoomList({ obj: newRoomList });
			}),
		),
	);

	private static check(condition: boolean | number): Action {
		if (condition === -1) {
			return new RoomListStoreActions.UpsertRoomListCanceled();
		}
		if (!!condition) {
			return new RoomListStoreActions.UpsertRoomListCanceled();
		}
	}
	constructor(
		private readonly actions$: Actions<HardwareFormActions>,
		private readonly roomFacade: RoomFacade,
		private readonly hardwareFacade: HardwareFacade,
		private readonly hardwareFormFacade: HardwareFormFacade,
		private readonly roomListFacade: RoomListFacade,
	) {}
}
