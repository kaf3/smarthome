import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { navigation } from '@nrwl/angular';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { RoomListStoreActions, RoomListStoreSelectors, RoomListStoreState } from '@store';
import { filter, map, take } from 'rxjs/operators';
import { RoomListComponent } from './room-list.component';

@Injectable()
export class RoomListUiEffects {
	navigation$ = createEffect(() =>
		this.actions$.pipe(
			navigation(RoomListComponent, {
				run: (_a: ActivatedRouteSnapshot): Observable<Action> | Action | void => {
					return this.store.select(RoomListStoreSelectors.selectRoomList).pipe(
						take(1),
						filter((rooms) => !rooms.length),
						map(() => new RoomListStoreActions.LoadRooms()),
					);
				},
			}),
		),
	);

	constructor(
		private readonly actions$: Actions,
		private readonly store: Store<RoomListStoreState.RoomListState>,
	) {}
}
