import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { navigation } from '@nrwl/angular';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { RoomListFacade, RoomListStoreActions } from '@store/room-list';
import { filter, map, take } from 'rxjs/operators';
import { RoomListComponent } from './room-list.component';
import { Room } from '@models';

@Injectable()
export class RoomListUiEffects {
	navigation$ = createEffect(() =>
		this.actions$.pipe(
			navigation(RoomListComponent, {
				run: (_a: ActivatedRouteSnapshot): Observable<Action> | Action | void => {
					return this.roomListFacade.roomList$.pipe(
						take(1),
						filter((rooms: Room[]) => !rooms.length),
						map(() => new RoomListStoreActions.LoadRooms()),
					);
				},
			}),
		),
	);

	constructor(
		private readonly actions$: Actions,
		private readonly roomListFacade: RoomListFacade,
	) {}
}
