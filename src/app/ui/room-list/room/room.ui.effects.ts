import { Actions, createEffect, ofType } from '@ngrx/effects';
import { navigation } from '@nrwl/angular';
import { RoomComponent } from './room.component';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RoomFacade, RoomStoreActions } from '@store/room';

@Injectable()
export class RoomUiEffects {
	navigationRoom = createEffect(() =>
		this.actions$.pipe(
			navigation(RoomComponent, {
				run: (routerSnap: ActivatedRouteSnapshot) => {
					return this.roomFacade.roomName$.pipe(
						take(1),
						filter((roomName) => roomName !== routerSnap.params.id),
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
				map((action) => {
					const { id } = action.payload.room.activeEquipment;
					if (!!id) {
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
