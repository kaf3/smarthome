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
import { RoomFacade, RoomStoreActions } from '@store/room';
import { Room } from '@models/room';
import { RoomListFacade, RoomListStoreActions } from '@store/room-list';
import { ClearAsyncErrorAction, SetAsyncErrorAction, StartAsyncValidationAction } from 'ngrx-forms';
import { RoomFormFacade } from './facade';
import { LoadRoomForm, RoomFormActionTypes, SubmitRoomForm } from './actions';

@Injectable()
export class RoomFormStateEffects {
	@Effect()
	loadRoomForm$ = this.actions$.pipe(
		ofType<RoomStoreActions.GetRoomSuccess>(RoomStoreActions.RoomActionTypes.getRoomSuccess),
		map((action) => new LoadRoomForm({ value: { name: action.payload.room.name } })),
	);

	submitRoomForm$ = createEffect(() =>
		this.actions$.pipe(
			ofType<SubmitRoomForm>(RoomFormActionTypes.SubmitRoomForm),
			withLatestFrom(this.roomFormFacade.roomFormState$, this.roomFacade.room$),
			map(([_, fs, room]) => {
				const newRoom = new Room({ ...room, name: fs.value.name ?? '' });
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
					withLatestFrom(this.roomListFacade.rooms$, this.roomFacade.room$),
					map(([_, rooms, room]) => {
						const isExists = !!rooms.find(
							(rm) => rm.name === fs.value.name && rm.name !== room.name,
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
		private readonly roomFacade: RoomFacade,
		private readonly roomListFacade: RoomListFacade,
	) {}
}
