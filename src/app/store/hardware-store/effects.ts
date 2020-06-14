import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	catchError,
	concatMap,
	filter,
	map,
	switchMap,
	take,
	withLatestFrom,
} from 'rxjs/operators';
import {
	HardwareActions,
	HardwareActionTypes,
	LoadHardwareSuccess,
	UpdateOneEquipmentFailure,
	UpdateOneEquipmentSuccess,
} from './actions';
import { RoomFacade } from '@store/room';
import { HardwareFacade } from './facade';
import { HttpRoomsService } from '@services';
import { of } from 'rxjs';

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
	updateEquipment$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HardwareActionTypes.UpdateOneEquipment),
			withLatestFrom(this.hardwareFacade.hardware$, this.roomFacade.room$),
			concatMap(([action, hardware, room]) =>
				this.httpRoomsService
					.postEquipment(action.payload.equipment, hardware.id, room.id)
					.pipe(
						map(
							(equipment) =>
								new UpdateOneEquipmentSuccess({
									equipment,
									room: action.payload.room,
									roomList: action.payload.roomList,
								}),
						),
					),
			),
			catchError(() =>
				of(new UpdateOneEquipmentFailure({ errorMsg: 'could not update equipment' })),
			),
		),
	);
	constructor(
		private readonly actions$: Actions<HardwareActions>,
		private readonly roomFacade: RoomFacade,
		private readonly hardwareFacade: HardwareFacade,
		private readonly httpRoomsService: HttpRoomsService,
	) {}
}
