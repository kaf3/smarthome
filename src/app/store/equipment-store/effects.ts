import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { RoomFacade } from '@store/room';

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
	);*/

	constructor(private readonly actions$: Actions, private readonly roomFacade: RoomFacade) {}
}
