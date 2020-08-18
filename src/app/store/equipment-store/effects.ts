import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class EquipmentEffects {
	/*	getEquipment$ = createEffect(() =>
		this.actions$.pipe(
			ofType<GetEquipment>(EquipmentActionsTypes.getEquipment),
			map((action) => action.payload.id),
			switchMap((id) =>
				this.roomFacade.hardwareById$(id).pipe(
					filter((equipment) => !!equipment),
					take(1),
				),
			),
			switchMap((equipment) => of(new GetEquipmentSuccess({ equipment }))),
		),
	); */

	constructor(private readonly actions$: Actions) {}
}
