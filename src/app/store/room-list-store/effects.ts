import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	AddRoom,
	AddRoomFailure,
	AddRoomSuccess,
	LoadRoomList,
	LoadRoomListError,
	LoadRoomListSuccess,
	MoveHardware,
	MoveHardwareError,
	MoveHardwareSuccess,
	RoomListActionsTypes,
	UpdateRoom,
	UpdateRoomFailure,
	UpdateRoomSuccess,
} from './actions';
import {
	catchError,
	concatMap,
	filter,
	map,
	switchMap,
	take,
	withLatestFrom,
} from 'rxjs/operators';

import { of } from 'rxjs';
import { HttpRoomsService, SerializeService } from '@services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoomListFacade } from './facade';
import { RoomList } from '@models/room-list';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { ErrorEffects } from '@models/common';

@Injectable()
export class RoomListEffects extends ErrorEffects {
	loadRooms$ = createEffect(() =>
		this.actions$.pipe(
			ofType<LoadRoomList>(RoomListActionsTypes.loadRoomList),
			switchMap(() => this.httpRoomsService.loadRoomList().pipe(take(1))),
			switchMap((roomList: RoomList) => of(new LoadRoomListSuccess({ roomList }))),
			catchError(() =>
				of(new LoadRoomListError({ errorMsg: 'Ошибка: не удалось загрузить комнаты' })),
			),
		),
	);

	moveHardware$ = createEffect(() =>
		this.actions$.pipe(
			ofType<MoveHardware>(RoomListActionsTypes.moveHardware),
			concatMap((action) => this.httpRoomsService.postRoomList(action.payload.roomList)),
			map((roomList) => new MoveHardwareSuccess({ roomList })),
			catchError(() =>
				of(new MoveHardwareError({ errorMsg: 'Ошибка: не удалось обновить комнаты' })),
			),
		),
	);

	updateRoom$ = createEffect(() =>
		this.actions$.pipe(
			ofType<UpdateRoom>(RoomListActionsTypes.updateRoom),
			concatMap((action) => this.httpRoomsService.postRoom(action.payload.room)),
			map((room) => new UpdateRoomSuccess({ room })),
			catchError(() =>
				of(new UpdateRoomFailure({ errorMsg: 'Ошибка: не удалось обновить комнату' })),
			),
		),
	);

	addRoom$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AddRoom>(RoomListActionsTypes.addRoom),
			concatMap((action) => this.httpRoomsService.postRoom(action.payload.room)),
			map((room) => new AddRoomSuccess({ room })),
			catchError(() =>
				of(new AddRoomFailure({ errorMsg: 'Ошибка: не удалось добавить комнату' })),
			),
		),
	);

	errorHandler = this.createErrorHandler(
		RoomListActionsTypes.loadRoomListError,
		RoomListActionsTypes.moveHardwareError,
		RoomListActionsTypes.updateRoomFailure,
		RoomListActionsTypes.addRoomFailure,
	);

	redirectToActiveRoom = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
				filter((action) => action.payload.routerState.url.endsWith('/rooms')),
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

	constructor(
		readonly actions$: Actions,
		private readonly httpRoomsService: HttpRoomsService,
		private readonly httpRooms: HttpRoomsService,
		private readonly serializer: SerializeService,
		readonly snackBar: MatSnackBar,
		private readonly router: Router,
		private readonly roomListFacade: RoomListFacade,
	) {
		super(snackBar, actions$);
	}
}
