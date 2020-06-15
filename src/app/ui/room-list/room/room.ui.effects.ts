import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RoomFacade } from '@store/room';
import { RoomListActionsTypes } from '../../../store/room-list-store/actions';
import { RoomListStoreActions } from '@store/room-list';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';

@Injectable()
export class RoomUiEffects {
	/*navigationRoom = createEffect(() =>
		this.actions$.pipe(
			navigation(RoomComponent, {
				run: (routerSnap: ActivatedRouteSnapshot) =>
					this.roomFacade.room$.pipe(
						take(1),
						filter((room) => room.id !== routerSnap.params.id),
						mapTo(
							new RoomStoreActions.GetRoom({
								id: routerSnap.params.id,
							}),
						),
					),
				onError(): Observable<any> | any {
					return of(
						new RoomStoreActions.GetRoomError({
							errorMsg: 'could not load room',
						}),
					);
				},
			}),
		),
	);*/

	redirectToActiveHardware$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
				filter((action) => !!/room\d+$/.test(action.payload.routerState.url)),
				withLatestFrom(this.roomFacade.room$),
				map(([_action, room]) => {
					const { id } = room.activeHardware;
					if (!!id) {
						this.router.navigate([`${this.router.url}/${id}`]);
					}
				}),
			),
		{ dispatch: false },
	);
	redirectBack = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RoomListStoreActions.MoveHardwareSuccess>(
					RoomListActionsTypes.moveHardwareSuccess,
				),
				map(() => {
					const url = this.router.url.split('/');
					url.pop();
					this.router.navigate([url.join('/')]);
				}),
			),
		{ dispatch: false },
	);

	constructor(
		private readonly actions$: Actions,
		private readonly roomFacade: RoomFacade,
		private readonly router: Router,
	) {}
}
