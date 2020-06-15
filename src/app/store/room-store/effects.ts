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
import { catchError, concatMap, map, switchMap, take } from 'rxjs/operators';
import { RoomListFacade } from '@store/room-list';
import { HttpRoomsService } from '@services';
import { of } from 'rxjs';

@Injectable()
export class RoomEffects {
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
				this.httpRoomsService.postHardware(payload.hardware, payload.room.id).pipe(
					map(
						(hardware) =>
							new UpdateOneHardwareSuccess({
								hardware,
								room: payload.room,
							}),
					),
				),
			),
			catchError(() =>
				of(new UpdateOneHardwareFailure({ errorMsg: 'could not update hardware' })),
			),
		),
	);
	constructor(
		private readonly actions$: Actions,
		private readonly roomListFacade: RoomListFacade,
		private readonly httpRoomsService: HttpRoomsService,
	) {}
}
