import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	LoadRoomList,
	LoadRoomListError,
	LoadRoomListSuccess,
	OpenRoomList,
	RoomListActionsTypes,
	UpsertRoomList,
	UpsertRoomListError,
	UpsertRoomListSuccess,
} from './actions';
import { catchError, concatMap, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';
import { HttpRoomsService, SerializeService } from '@services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoomListFacade } from './facade';
import { RoomList } from '@models/rooms';

@Injectable()
export class RoomListEffects {
	loadRooms$ = createEffect(() =>
		this.actions$.pipe(
			ofType<LoadRoomList>(RoomListActionsTypes.loadRoomList),
			switchMap(() => this.httpRoomsService.loadRoomList().pipe(take(1))),
			switchMap((roomList: RoomList) => of(new LoadRoomListSuccess({ roomList }))),
			catchError(() =>
				of(new LoadRoomListError({ errorMsg: 'Error: could not load rooms' })),
			),
		),
	);

	upsertRoomList$ = createEffect(() =>
		this.actions$.pipe(
			ofType<UpsertRoomList>(RoomListActionsTypes.upsertRoomList),
			concatMap((action) => this.httpRoomsService.postRoomList(action.payload.roomList)),
			map((roomList) => new UpsertRoomListSuccess({ roomList })),
			catchError(() =>
				of(new UpsertRoomListError({ errorMsg: 'Error: could not update rooms' })),
			),
		),
	);

	errorHandler = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					RoomListActionsTypes.loadRoomListError,
					RoomListActionsTypes.upsertRoomListError,
				),
				map((action: LoadRoomListError) =>
					this.openSnackBar(action.payload.errorMsg, 'Error'),
				),
			),
		{ dispatch: false },
	);

	redirectToActiveRoom = createEffect(
		() =>
			this.actions$.pipe(
				ofType<OpenRoomList>(RoomListActionsTypes.openRoomList),
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

	private openSnackBar(message: string, action: string): void {
		this._snackBar.open(message, action, {
			duration: 2000,
		});
	}

	constructor(
		private readonly actions$: Actions,
		private readonly httpRoomsService: HttpRoomsService,
		private readonly httpRooms: HttpRoomsService,
		private readonly serializer: SerializeService,
		private readonly _snackBar: MatSnackBar,
		private readonly router: Router,
		private readonly roomListFacade: RoomListFacade,
	) {}
}
