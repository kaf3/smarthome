import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	catchError,
	concatMap,
	filter,
	map,
	switchMap,
	take,
	withLatestFrom,
} from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { HttpRoomsService, LastVisitedService, SerializeService } from '@services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoomList } from '@models/room-list';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { ErrorEffects } from '@models/common';
import { Room } from '@models/room';
import { RoomListFacade } from './facade';
import {
	AddRoom,
	AddRoomFailure,
	AddRoomSuccess,
	DeleteRoom,
	DeleteRoomFailure,
	DeleteRoomSuccess,
	LoadRoomList,
	LoadRoomListError,
	LoadRoomListSuccess,
	MoveHardware,
	MoveHardwareError,
	MoveHardwareSuccess,
	RoomListActions,
	RoomListActionsTypes,
	UpdateOneEquipment,
	UpdateOneEquipmentFailure,
	UpdateOneEquipmentSuccess,
	UpdateOneHardware,
	UpdateOneHardwareFailure,
	UpdateOneHardwareSuccess,
	UpdateRoom,
	UpdateRoomFailure,
	UpdateRoomSuccess,
} from './actions';
import { RoomListStoreActions } from './index';

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
			concatMap((action) => this.httpRoomsService.patchRoomList(action.payload.roomList)),
			map((roomList) => new MoveHardwareSuccess({ roomList })),
			catchError(() =>
				of(new MoveHardwareError({ errorMsg: 'Ошибка: не удалось обновить комнаты' })),
			),
		),
	);

	updateRoom$ = createEffect(() =>
		this.actions$.pipe(
			ofType<UpdateRoom>(RoomListActionsTypes.updateRoom),
			concatMap((action) => this.httpRoomsService.patchRoom(action.payload.room)),
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

	deleteRoom$ = createEffect(() =>
		this.actions$.pipe(
			ofType<DeleteRoom>(RoomListActionsTypes.DeleteRoom),
			withLatestFrom(this.roomListFacade.rooms$),
			concatMap(([action, rooms]) => {
				const { room } = action.payload;
				if (room.hardwareEntityState.ids.length === 0 && rooms.length > 1) {
					return this.httpDeleteRoom$(room);
				}
				if (rooms.length <= 1) {
					return of(new DeleteRoomFailure({ errorMsg: 'Оставьте хотя бы одну комнату' }));
				}
				return of(new DeleteRoomFailure({ errorMsg: 'Очистите комнату перед удалением' }));
			}),
		),
	);

	updateHardware$ = createEffect(() =>
		this.actions$.pipe(
			ofType<UpdateOneHardware>(RoomListActionsTypes.updateOneHardware),
			concatMap(({ payload }) =>
				this.httpRoomsService.patchHardware(payload.hardware, payload.room.id).pipe(
					map(
						(hardware) =>
							new UpdateOneHardwareSuccess({
								hardware,
								room: payload.room,
							}),
					),
					catchError(() =>
						of(new UpdateOneHardwareFailure({ errorMsg: 'could not update hardware' })),
					),
				),
			),
		),
	);

	updateEquipment$ = createEffect(() =>
		this.actions$.pipe(
			ofType<UpdateOneEquipment>(RoomListActionsTypes.UpdateOneEquipment),
			concatMap(({ payload }) =>
				this.httpRoomsService
					.patchEquipment(payload.equipment, payload.hardware.id, payload.room.id)
					.pipe(
						map(
							(equipment) =>
								new UpdateOneEquipmentSuccess({
									equipment,
									room: payload.room,
									hardware: payload.hardware,
								}),
						),
						catchError(() =>
							of(
								new UpdateOneEquipmentFailure({
									errorMsg: 'could not update equipment',
								}),
							),
						),
					),
			),
		),
	);

	errorHandler = this.createErrorHandler(
		RoomListActionsTypes.loadRoomListError,
		RoomListActionsTypes.moveHardwareError,
		RoomListActionsTypes.updateRoomFailure,
		RoomListActionsTypes.addRoomFailure,
		RoomListActionsTypes.DeleteRoomFailure,
		RoomListActionsTypes.updateOneHardwareFailure,
		RoomListActionsTypes.UpdateOneEquipmentFailure,
	);

	redirectToActiveRoom = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
				filter((action) => action.payload.routerState.url.endsWith('/rooms')),
				withLatestFrom(this.roomListFacade.rooms$),
				map(([_a, rooms]) => {
					const id = this.lastVisitedService.getUrl('rooms') ?? rooms[0].id;
					if (!!id && this.router.url.endsWith('/rooms')) {
						this.router.navigate([`${this.router.url}/${id}`]);
					}
				}),
			),
		{ dispatch: false },
	);

	redirectToActiveHardware$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
				filter((action) =>
					/^\/home\/rooms\/[\w-]{20}$/.test(action.payload.routerState.url),
				),
				withLatestFrom(this.roomListFacade.room$),
				map(([_action, room]) => {
					const id = this.lastVisitedService.getUrl(room?.id ?? '');
					if (!!id) {
						this.router.navigate([`${this.router.url}/${id}`]);
					}
				}),
			),
		{ dispatch: false },
	);

	redirectBack = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RoomListStoreActions.MoveHardwareSuccess>(
					RoomListActionsTypes.moveHardwareSuccess,
				),
				map(() => {
					const url = this.router.url.split('/');
					url.pop();
					this.router.navigate([url.join('/')]);
				}),
			),
		{ dispatch: false },
	);

	httpDeleteRoom$(room: Room): Observable<RoomListActions> {
		return this.httpRooms.deleteRoom(room).pipe(
			map((value) => {
				if (value.response === null) {
					return new DeleteRoomSuccess({ room: value.room });
				}
				return new DeleteRoomFailure({
					errorMsg: 'Не удалось удалить комнату',
				});
			}),
			catchError(() => of(new DeleteRoomFailure({ errorMsg: 'Не удалось удалить комнату' }))),
		);
	}

	redirectFromDeletedRoom$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(RoomListActionsTypes.DeleteRoomSuccess),
				withLatestFrom(this.roomListFacade.rooms$),
				map(([_deletedRoom, rooms]) => {
					this.router.navigate([`/home/rooms/${rooms[0].id}`]);
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
		private readonly lastVisitedService: LastVisitedService,
	) {
		super(snackBar, actions$);
	}
}
