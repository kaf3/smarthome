import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {EquipmentFormState, EquipmentFormValue} from './state';
import {
    EquipmentFormActions,
    LoadEquipmentForm,
    LoadEquipmentFormSuccess,
    SubmitEquipmentForm,
    SubmitEquipmentFormSuccess,
} from './actions';
import {map, switchMap, take} from 'rxjs/operators';
import {filter} from 'rxjs/operators';
import {Equipment} from '../../../models/equipment';
import {of} from 'rxjs';
import {MarkAsSubmittedAction} from 'ngrx-forms';
import {selectEquipmentFormState} from './selectors';
import {EquipmentStoreSelectors, EquipmentStoreActions} from '../equipment-store';
import {EquipmentListStoreActions} from '../equipment-list-store';
import {HttpRoomsService} from '../../sevices/http-rooms.service';
import {SerializeService} from '../../sevices/serialize.service';
import {RoomDTO} from '../../../models/roomDTO';
import {RoomListStoreActions} from '../room-list-store';

@Injectable()
export class EquipmentFormEffects {
    loadEquipmentForm$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadEquipmentForm>(EquipmentFormActions.loadEquipmentForm),
            switchMap(() =>
                this.store
                    .select(EquipmentStoreSelectors.selectEquipment)
                    .pipe(filter(equipment => !!equipment)),
            ),
            switchMap((equipment: Equipment) =>
                of(
                    new LoadEquipmentFormSuccess({
                        name: equipment.name,
                        value: equipment.value,
                    }),
                ),
            ),
        ),
    );

    submitEquipmentForm$ = createEffect(() =>
        this.actions$.pipe(
            ofType<SubmitEquipmentForm>(EquipmentFormActions.submitEquipmentForm),
            switchMap(() => this.store.select(selectEquipmentFormState).pipe(take(1))),
            switchMap((formState: EquipmentFormState) =>
                this.store.select(EquipmentStoreSelectors.selectEquipment).pipe(
                    take(1),
                    map((equipment: Equipment) => {
                        equipment.name = formState.value.name;
                        equipment.value = formState.value.value;

                        return this.serializer.serializeEquipment(equipment);
                    }),
                ),
            ),
            switchMap((equipmentDTO: RoomDTO) =>
                this.httpRooms
                    .loadRoomsDTO()
                    .pipe(map(roomsDTO => ({roomsDTO, equipmentDTO}))),
            ),
            switchMap(({roomsDTO, equipmentDTO}) => {
                roomsDTO[equipmentDTO.r_name] = this.serializer.serializeRoom(
                    equipmentDTO,
                    roomsDTO[equipmentDTO.r_name],
                );
                console.log(roomsDTO);

                return this.httpRooms.postRooms(roomsDTO);
            }),
            switchMap(() => of(new SubmitEquipmentFormSuccess())),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<EquipmentFormState>,
        private readonly httpRooms: HttpRoomsService,
        private readonly serializer: SerializeService,
    ) {}
}
