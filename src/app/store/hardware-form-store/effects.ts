import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { HardwareFormActions, HardwareFormActionTypes, LoadHardwareFormSuccess } from './actions';
import { RoomFacade, RoomStoreActions } from '@store/room';
import { HardwareFacade } from '@store/hardware';
import { HardwareFormFacade } from './facade';
import { RoomListFacade, RoomListStoreActions } from '@store/room-list';
import { Hardware } from '@models/hardware';
import { Room } from '@models/room';
import { RoomList } from '@models/rooms';

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
				const formControls = formState.controls;
				const formValue = formState.value;
				const oldHardware = new Hardware({ ...hardware });
				let oldRoomList = new RoomList({ ...roomList });
				let oldRoom = new Room({ ...room });
				if (formControls.name.isDirty) {
					oldHardware.name = formValue.name;
				}

				if (formControls.name.isDirty && formControls.roomName.isPristine) {
					return new RoomStoreActions.UpdateOneHardware({ hardware: oldHardware });
				}

				if (formControls.roomName.isDirty) {
					let newRoom = oldRoomList.rooms.find((r) => r.name === formValue.roomName);
					oldRoomList.rooms.forEach((x) => console.log(x.name, x instanceof Room));
					oldRoom = Room.deleteHardware(oldRoom, oldHardware);
					oldRoom.activeHardware = Hardware.initial;
					newRoom = Room.addHardware(newRoom, oldHardware);

					oldRoomList = RoomList.updateManyRoom(oldRoomList, [oldRoom, newRoom]);
					console.log(oldRoomList);

					return new RoomListStoreActions.MoveHardware({ roomList: oldRoomList });
				}

				return new RoomListStoreActions.UpsertRoomListCanceled();
			}),
		),
	);

	constructor(
		private readonly actions$: Actions<HardwareFormActions>,
		private readonly roomFacade: RoomFacade,
		private readonly hardwareFacade: HardwareFacade,
		private readonly hardwareFormFacade: HardwareFormFacade,
		private readonly roomListFacade: RoomListFacade,
	) {}
}
