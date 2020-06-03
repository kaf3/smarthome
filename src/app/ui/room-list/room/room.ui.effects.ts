import { Actions, createEffect, ofType } from '@ngrx/effects';
import { navigation } from '@nrwl/angular';
import { RoomComponent } from './room.component';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { filter, map, mapTo, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RoomFacade, RoomStoreActions } from '@store/room';

@Injectable()
export class RoomUiEffects {
	navigationRoom = createEffect(() =>
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
	);

	redirectToActiveHardware$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RoomStoreActions.GetRoomSuccess>(
					RoomStoreActions.RoomActionTypes.getRoomSuccess,
				),
				map((action) => {
					const { id } = action.payload.room.activeHardware;
					//console.log(action.payload.room.activeHardware);
					if (!!id && !!/room\d+$/.test(this.router.url)) {
						this.router.navigate([`${this.router.url}/${id}`]);
					}
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
