import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetRoom, GetRoomSuccess, RoomActions } from './actions';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { RoomListStoreSelectors } from '../room-list-store';
import { RoomState } from './state';

@Injectable()
export class RoomEffects {
	getRoom$ = createEffect(() =>
		this.actions$.pipe(
			ofType<GetRoom>(RoomActions.getRoom),
			map((action) => action.payload.roomName),
			switchMap((roomName) =>
				this.store.select(RoomListStoreSelectors.selectRoomByName, roomName).pipe(
					filter((room) => !!room),
					take(1),
				),
			),
			switchMap((room) => of(new GetRoomSuccess({ room }))),
		),
	);

	constructor(private readonly actions$: Actions, private readonly store: Store<RoomState>) {}
}
