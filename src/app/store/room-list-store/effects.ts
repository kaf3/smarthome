import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	LoadRoomList,
	LoadRoomListError,
	LoadRoomListSuccess,
	OpenRoomList,
	RoomListActionsTypes,
} from './actions';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';
import { HttpRoomsService, SerializeService } from '@services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoomListFacade } from './facade';
import { RoomList } from '@models/rooms';

@Injectable()
export class RoomListEffects {
	loadRooms$ = createEffect(() =>
		this.actions$.pipe(
			ofType<LoadRoomList>(RoomListActionsTypes.loadRoomList),
			switchMap(() => this.httpRoomsService.loadRoomList().pipe(take(1))),
			switchMap((roomList: RoomList) => of(new LoadRoomListSuccess({ roomList }))),
			catchError(() =>
				of(new LoadRoomListError({ errorMsg: 'Error: could not load rooms' })),
			),
		),
	);

	/*	upsertAllRooms$ = createEffect(() =>
		this.actions$.pipe(
			ofType<UpsertAllRooms>(RoomListActionsTypes.upsertAllRooms),
			switchMap(({ payload }) => {
				const { obj } = payload;

				if (Object.prototype.hasOwnProperty.call(obj, 'roomName')) {
					return of(null);
				}

				if (Object.prototype.hasOwnProperty.call(obj, 'value')) {
					return this.httpRooms.loadRoomsDTO().pipe(
						map((roomsDTO) => {
							const equipmentDTO = this.serializer.serializeEquipment(
								obj as Equipment,
							);

							roomsDTO[equipmentDTO.r_name] = this.serializer.serializeRoom(
								equipmentDTO,
								roomsDTO[equipmentDTO.r_name],
							);

							return roomsDTO;
						}),
					);
				}

				return of(null);
			}),
			switchMap((roomsDTO: RoomsDTO) => this.httpRooms.postRooms(roomsDTO)),
			switchMap((rooms: Room[]) => of(new UpsertAllRoomsSuccess({ rooms }))),
			catchError(() =>
				of(new LoadRoomListError({ errorMsg: 'Error: could not update rooms' })),
			),
		),
	);*/

	errorHandler = createEffect(
		() =>
			this.actions$.pipe(
				ofType<LoadRoomListError>(RoomListActionsTypes.loadRoomListError),
				map((action: LoadRoomListError) =>
					this.openSnackBar(action.payload.errorMsg, 'Error'),
				),
			),
		{ dispatch: false },
	);

	redirectToActiveRoom = createEffect(
		() =>
			this.actions$.pipe(
				ofType<OpenRoomList>(RoomListActionsTypes.openRoomList),
				withLatestFrom(this.roomListFacade.roomList$),
				map(([_a, roomList]) => {
					const { id } = roomList.activeRoom;
					if (!!id && this.router.url.endsWith('/rooms')) {
						this.router.navigate([`/rooms/${id}`]);
					}
				}),
			),
		{ dispatch: false },
	);

	private openSnackBar(message: string, action: string): void {
		this._snackBar.open(message, action, {
			duration: 2000,
		});
	}

	constructor(
		private readonly actions$: Actions,
		private readonly httpRoomsService: HttpRoomsService,
		private readonly httpRooms: HttpRoomsService,
		private readonly serializer: SerializeService,
		private readonly _snackBar: MatSnackBar,
		private readonly router: Router,
		private readonly roomListFacade: RoomListFacade,
	) {}
}
