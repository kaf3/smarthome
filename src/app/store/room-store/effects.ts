import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetRoom, GetRoomSuccess, RoomActionTypes } from './actions';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { RoomListFacade } from '@store/room-list';

@Injectable()
export class RoomEffects {
	getRoom$ = createEffect(() =>
		this.actions$.pipe(
			ofType<GetRoom>(RoomActionTypes.getRoom),
			map((action) => action.payload.roomName),
			switchMap((roomName) =>
				this.roomListFacade.rooms$.pipe(
					map((rooms) => rooms.find((room) => room.roomName === roomName)),
					filter((room) => !!room),
					take(1),
				),
			),
			switchMap((room) => of(new GetRoomSuccess({ room }))),
		),
	);

	constructor(
		private readonly actions$: Actions,
		private readonly roomListFacade: RoomListFacade,
	) {}
}
