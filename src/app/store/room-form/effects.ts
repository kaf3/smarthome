import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';

import {
	distinctUntilKeyChanged,
	filter,
	map,
	mapTo,
	switchMap,
	withLatestFrom,
} from 'rxjs/operators';
import { timer } from 'rxjs';
import { Room } from '@models/room';
import { RoomListFacade, RoomListStoreActions } from '@store/room-list';
import { ClearAsyncErrorAction, SetAsyncErrorAction, StartAsyncValidationAction } from 'ngrx-forms';
import { RoomFormFacade } from './facade';
import { LoadRoomForm, RoomFormActionTypes, SubmitRoomForm } from './actions';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';

@Injectable()
export class RoomFormStateEffects {
	@Effect()
	loadRoomForm$ = this.actions$.pipe(
		ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
		filter((action) => /^\/rooms\/[\w-]{20}$/.test(action.payload.routerState.url)),
		withLatestFrom(this.roomListFacade.room$),

		map(([_, room]) => new LoadRoomForm({ value: { name: room?.name ?? null } })),
	);

	submitRoomForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType<SubmitRoomForm>(RoomFormActionTypes.SubmitRoomForm),
			withLatestFrom(this.roomFormFacade.roomFormState$, this.roomListFacade.room$),
			map(([_, fs, room]) => {
				const newRoom = new Room({ ...room, name: fs.value.name ?? '' } as Room);
				return new RoomListStoreActions.UpdateRoom({ room: newRoom });
			}),
		),
	);

	uniqueName$ = createEffect(() =>
		this.roomFormFacade.roomFormState$.pipe(
			filter((fs) => !!fs.value.name),
			distinctUntilKeyChanged('value'),
			switchMap((fs) =>
				timer(300).pipe(
					mapTo(new StartAsyncValidationAction(fs.controls.name.id, 'roomExists')),
					withLatestFrom(this.roomListFacade.rooms$, this.roomListFacade.room$),
					map(([_, rooms, room]) => {
						const isExists = !!rooms.find(
							(rm) => rm.name === fs.value.name && rm.name !== room?.name,
						);
						return isExists
							? new SetAsyncErrorAction(fs.controls.name.id, 'roomExists', true)
							: new ClearAsyncErrorAction(fs.controls.name.id, 'roomExists');
					}),
				),
			),
		),
	);

	constructor(
		private actions$: Actions,
		private readonly roomFormFacade: RoomFormFacade,
		private readonly roomListFacade: RoomListFacade,
	) {}
}
