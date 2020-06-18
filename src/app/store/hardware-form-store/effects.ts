import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	distinctUntilKeyChanged,
	filter,
	map,
	mapTo,
	switchMap,
	withLatestFrom,
} from 'rxjs/operators';
import { HardwareFormActions, HardwareFormActionTypes, LoadHardwareFormSuccess } from './actions';
import { RoomFacade, RoomStoreActions } from '@store/room';
import { HardwareFacade } from '@store/hardware';
import { HardwareFormFacade } from './facade';
import { RoomListFacade, RoomListStoreActions } from '@store/room-list';
import { Hardware } from '@models/hardware';
import { Room } from '@models/room';
import { RoomList } from '@models/room-list';
import { ClearAsyncErrorAction, SetAsyncErrorAction, StartAsyncValidationAction } from 'ngrx-forms';
import { timer } from 'rxjs';
import { ErrorEffects } from '@models/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HardwareFormEffects extends ErrorEffects {
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
				const formValue = formState.value;
				const oldHardware = new Hardware({ ...hardware });
				let oldRoomList = new RoomList({ ...roomList });
				let oldRoom = new Room({ ...room });
				const isNameChanged = formValue.name !== oldHardware.name;
				const isRoomNameChanged = formValue.roomName !== oldRoom.name;
				if (isNameChanged) {
					oldHardware.name = formValue.name ?? oldHardware.name;
				}

				if (isNameChanged && !isRoomNameChanged) {
					oldRoom = Room.updateHardware(oldRoom, oldHardware);
					return new RoomStoreActions.UpdateOneHardware({
						hardware: oldHardware,
						room: oldRoom,
					});
				}

				if (isRoomNameChanged) {
					let newRoom = oldRoomList.rooms.find((r) => r.name === formValue.roomName);
					if (newRoom) {
						oldRoom = Room.deleteHardware(oldRoom, oldHardware);
						oldRoom.activeHardware = Hardware.initial;
						newRoom = Room.addHardware(newRoom, oldHardware);
						oldRoomList = RoomList.updateManyRooms(oldRoomList, [oldRoom, newRoom]);
					}
					return new RoomListStoreActions.MoveHardware({ roomList: oldRoomList });
				}

				return new RoomListStoreActions.UpsertRoomListCanceled();
			}),
		),
	);

	uniqueName = createEffect(() =>
		this.hardwareFormFacade.hardwareFormState$.pipe(
			filter((fs) => !!fs.value.name),
			distinctUntilKeyChanged('value'),
			switchMap((fs) =>
				timer(300).pipe(
					mapTo(new StartAsyncValidationAction(fs.controls.name.id, 'exists')),
					withLatestFrom(
						this.roomListFacade.rooms$,
						this.roomFacade.room$,
						this.hardwareFacade.hardware$,
					),
					map(([_, rooms, room, hardware]) => {
						let isExists: boolean;
						if (fs.value.roomName !== room.name) {
							const selectedRoom = rooms.find((rm) => rm.name === fs.value.roomName);
							isExists = !!selectedRoom?.hardwares.find(
								(hrd) => hrd.name === fs.value.name,
							);
						} else {
							isExists = !!room.hardwares.find(
								(hrd) => hrd.name === fs.value.name && hrd.name !== hardware.name,
							);
						}

						return isExists
							? new SetAsyncErrorAction(fs.controls.name.id, 'exists', true)
							: new ClearAsyncErrorAction(fs.controls.name.id, 'exists');
					}),
				),
			),
		),
	);

	errorHandler = this.createErrorHandler(HardwareFormActionTypes.LoadHardwareFormFailure);

	constructor(
		readonly actions$: Actions<HardwareFormActions>,
		private readonly roomFacade: RoomFacade,
		private readonly hardwareFacade: HardwareFacade,
		private readonly hardwareFormFacade: HardwareFormFacade,
		private readonly roomListFacade: RoomListFacade,
		readonly snackBar: MatSnackBar,
	) {
		super(snackBar, actions$);
	}
}
