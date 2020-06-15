import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { RoomFacade } from '@store/room';

@Injectable()
export class HardwareUiEffects {
	/*	navigationHardware = createEffect(() =>
		this.actions$.pipe(
			navigation(HardwareComponent, {
				run: (a: ActivatedRouteSnapshot) =>
					new HardwareStoreActions.LoadHardware({ id: a.params['hardwareId'] }),
				onError(_a: ActivatedRouteSnapshot, _e: any): any {
					return new HardwareStoreActions.LoadHardwareFailure({
						errorMsg: 'could not load hardware',
					});
				},
			}),
		),
	);*/

	constructor(private readonly actions$: Actions, private readonly roomFacade: RoomFacade) {}
}
