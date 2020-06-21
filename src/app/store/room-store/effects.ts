import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	GetRoom,
	GetRoomError,
	GetRoomSuccess,
	RoomActionTypes,
	UpdateOneHardware,
	UpdateOneHardwareFailure,
	UpdateOneHardwareSuccess,
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
import { RoomListFacade, RoomListStoreActions } from '@store/room-list';
import { HttpRoomsService } from '@services';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { RoomFacade } from './facade';
import { RoomListActionsTypes } from '../room-list-store/actions';
import { ErrorEffects } from '@models/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class RoomEffects extends ErrorEffects {
	getRoom$ = createEffect(() =>
		this.actions$.pipe(
			ofType<GetRoom>(RoomActionTypes.getRoom),
			switchMap((action) =>
				this.roomListFacade.roomById$(action.payload.id).pipe(
					map((room) => {
						if (!room) throw new Error();
						return room;
					}),
					//filter((room) => !!room?.id),
					take(1),
					map((room) => new GetRoomSuccess({ room })),
					catchError(() =>
						of(
							new GetRoomError({
								errorMsg: 'Ошибка: Комната не найдена',
							}),
						),
					),
				),
			),
		),
	);
	updateHardware$ = createEffect(() =>
		this.actions$.pipe(
			ofType<UpdateOneHardware>(RoomActionTypes.updateOneHardware),
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

	redirectToActiveHardware$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
				filter((action) => {
					const _url = action.payload.routerState.url.split('/');

					console.log(this.route.children, _url);
					return /room\d+$/.test(action.payload.routerState.url);
				}),
				withLatestFrom(this.roomFacade.room$),
				map(([_action, room]) => {
					const { id } = room.activeHardware;
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

	errorHandler$ = this.createErrorHandler(
		RoomActionTypes.getRoomError,
		RoomActionTypes.updateOneHardwareFailure,
	);

	constructor(
		readonly actions$: Actions,
		private readonly roomListFacade: RoomListFacade,
		private readonly roomFacade: RoomFacade,
		private readonly httpRoomsService: HttpRoomsService,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		readonly snackBar: MatSnackBar,
	) {
		super(snackBar, actions$);
	}
}
