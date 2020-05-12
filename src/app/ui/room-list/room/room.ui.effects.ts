import { Actions, createEffect, ofType } from '@ngrx/effects';
import { navigation } from '@nrwl/angular';
import { RoomComponent } from './room.component';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RoomFacade, RoomStoreActions } from '@store/room';
import { RouterFacade } from '@store/router';

@Injectable()
export class RoomUiEffects {
	navigationRoom = createEffect(() =>
		this.actions$.pipe(
			navigation(RoomComponent, {
				run: (routerSnap: ActivatedRouteSnapshot) => {
					return this.roomFacade.roomName$.pipe(
						take(1),
						filter((roomName) => roomName !== routerSnap.params.id),
						map((x) => {
							console.log('eff');
							return x;
						}),
						map(
							() =>
								new RoomStoreActions.GetRoom({
									roomName: routerSnap.params.id,
								}),
						),
					);
				},
				onError(): Observable<any> | any {
					return of(
						new RoomStoreActions.GetRoomError({
							errorMsg: 'could not load room',
						}),
					);
				},
			}),
		),
	);

	redirectToActiveEquipment$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RoomStoreActions.GetRoomSuccess>(
					RoomStoreActions.RoomActionTypes.getRoomSuccess,
				),
				withLatestFrom(this.routerFacade.routerState$),
				map(([_, router]) => router),
				withLatestFrom(this.roomFacade.activeEquipment$),
				map(([_router, eqp]) => {
					/*const url = router.state.url + '/' + eqp.id;
										const routerState = { ...router.state };
					const event = new NavigationStart(router.navigationId, url, 'imperative', null);
					const payload: RouterRequestPayload = { routerState, event };
					const routerRequestAction: RouterRequestAction = {
						type: ROUTER_REQUEST,
						payload,
					};
					return routerRequestAction;*/
					if (eqp.id) {
						//this.router.navigate([`${eqp.id}`]);
					}
				}),
			),
		{ dispatch: false },
	);

	constructor(
		private readonly actions$: Actions,
		private readonly roomFacade: RoomFacade,
		private readonly routerFacade: RouterFacade,
		private readonly router: Router,
	) {}
}
