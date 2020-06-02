import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	GetRoom,
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
import { RoomListFacade } from '@store/room-list';
import { HttpRoomsService } from '@services';
import { RoomFacade } from './facade';
import { of } from 'rxjs';

@Injectable()
export class RoomEffects {
	getRoom$ = createEffect(() =>
		this.actions$.pipe(
			ofType<GetRoom>(RoomActionTypes.getRoom),
			switchMap((action) =>
				this.roomListFacade.roomById$(action.payload.id).pipe(
					filter((room) => !!room),
					take(1),
					map((room) => new GetRoomSuccess({ room })),
				),
			),
		),
	);
	updateHardware$ = createEffect(() =>
		this.actions$.pipe(
			ofType<UpdateOneHardware>(RoomActionTypes.updateOneHardware),
			withLatestFrom(this.roomFacade.room$),
			concatMap(([action, room]) =>
				this.httpRoomsService.postHardware(action.payload.hardware, room.id),
			),
			map((hardware) => new UpdateOneHardwareSuccess({ hardware })),
			catchError(() =>
				of(new UpdateOneHardwareFailure({ errorMsg: 'could not update hardware' })),
			),
		),
	);
	constructor(
		private readonly actions$: Actions,
		private readonly roomListFacade: RoomListFacade,
		private readonly httpRoomsService: HttpRoomsService,
		private readonly roomFacade: RoomFacade,
	) {}
}
