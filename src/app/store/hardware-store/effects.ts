import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, take } from 'rxjs/operators';
import {
	HardwareActions,
	HardwareActionTypes,
	LoadHardwareFailure,
	LoadHardwareSuccess,
	UpdateOneEquipmentFailure,
	UpdateOneEquipmentSuccess,
} from './actions';
import { RoomFacade } from '@store/room';
import { HttpRoomsService } from '@services';
import { of } from 'rxjs';
import { ErrorEffects } from '@models/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HardwareEffects extends ErrorEffects {
	getHardware$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HardwareActionTypes.LoadHardware),
			switchMap((action) =>
				this.roomFacade.hardwareById$(action.payload.id).pipe(
					map((hardware) => {
						if (!hardware) throw new Error();
						return hardware;
					}),
					take(1),
					map((hardware) => new LoadHardwareSuccess({ hardware })),
					catchError(() =>
						of(
							new LoadHardwareFailure({
								errorMsg: 'Ошибка, устройство не найдено',
							}),
						),
					),
				),
			),
		),
	);
	updateEquipment$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HardwareActionTypes.UpdateOneEquipment),
			concatMap(({ payload }) =>
				this.httpRoomsService
					.patchEquipment(payload.equipment, payload.hardware.id, payload.room.id)
					.pipe(
						map(
							(equipment) =>
								new UpdateOneEquipmentSuccess({
									equipment,
									room: payload.room,
									hardware: payload.hardware,
								}),
						),
						catchError(() =>
							of(
								new UpdateOneEquipmentFailure({
									errorMsg: 'could not update equipment',
								}),
							),
						),
					),
			),
		),
	);

	errorHandler = this.createErrorHandler(
		HardwareActionTypes.UpdateOneEquipmentFailure,
		HardwareActionTypes.LoadHardwareFailure,
	);
	constructor(
		readonly actions$: Actions<HardwareActions>,
		private readonly roomFacade: RoomFacade,
		private readonly httpRoomsService: HttpRoomsService,
		readonly snackBar: MatSnackBar,
	) {
		super(snackBar, actions$);
	}
}
