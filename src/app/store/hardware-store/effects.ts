import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { HardwareActions, HardwareActionTypes, LoadHardwareSuccess } from './actions';
import { RoomFacade } from '@store/room';

@Injectable()
export class HardwareEffects {
	getHardware$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HardwareActionTypes.LoadHardware),
			switchMap((action) =>
				this.roomFacade.hardwareById$(action.payload.id).pipe(
					filter((hardware) => !!hardware?.id),
					take(1),
					map((hardware) => new LoadHardwareSuccess({ hardware })),
				),
			),
			/*			catchError(() =>
				of(
					new LoadHardwareFailure({
						errorMsg: 'could not load hardware',
					}),
				),
			),*/
		),
	);
	constructor(
		private readonly actions$: Actions<HardwareActions>,
		private readonly roomFacade: RoomFacade,
	) {}
}
