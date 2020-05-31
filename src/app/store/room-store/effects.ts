import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetRoom, GetRoomSuccess, RoomActionTypes } from './actions';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { RoomListFacade } from '@store/room-list';

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

	constructor(
		private readonly actions$: Actions,
		private readonly roomListFacade: RoomListFacade,
	) {}
}
