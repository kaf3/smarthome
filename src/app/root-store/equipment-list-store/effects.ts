import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EquipmentListState} from './state';
import {Store} from '@ngrx/store';
import {
    EquipmentListActions,
    LoadEquipmentList,
    LoadEquipmentListError,
    LoadEquipmentListSuccess,
    UpsertOneEquipment,
} from './actions';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {selectRoom} from '../room-store/selectors';
import {Room} from '../../../models/room';
import {Equipment} from '../../../models/equipment';
import {of} from 'rxjs';
import {SerializeService} from '../../sevices/serialize.service';
import {RoomDTO} from '../../../models/roomDTO';
import {HttpRoomsService} from '../../sevices/http-rooms.service';
import {RoomsDTO} from '../../../models/roomsDTO';
import {RoomListStoreActions} from '../room-list-store';

@Injectable()
export class EquipmentListEffects {
    loadEquipmentList$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadEquipmentList>(EquipmentListActions.loadEquipmentList),
            switchMap(() =>
                this.store.select(selectRoom).pipe(
                    filter(room => !!room),
                    map((room: Room) => room.equipment),
                ),
            ),
            switchMap((equipmentList: Equipment[]) =>
                of(new LoadEquipmentListSuccess({equipmentList})),
            ),
            catchError(() => of(new LoadEquipmentListError())),
        ),
    );
    upsertOneEquipment$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UpsertOneEquipment>(EquipmentListActions.upsertOneEquipment),
            map((action: UpsertOneEquipment) =>
                this.serializeService.serializeEquipment(action.payload.equipment),
            ),
            switchMap((equipmentDTO: RoomDTO) =>
                this.httpRoomsService
                    .loadRoomsDTO()
                    .pipe(map((roomsDTO: RoomsDTO) => ({equipmentDTO, roomsDTO}))),
            ),
            map(({equipmentDTO, roomsDTO}) =>
                this.serializeService.serializeRoom(
                    equipmentDTO,
                    roomsDTO[equipmentDTO.r_name],
                ),
            ),
            switchMap((roomDTO: RoomDTO) =>
                of(new RoomListStoreActions.UpsertOneRoom({roomDTO})),
            ),
        ),
    );
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<EquipmentListState>,
        private readonly serializeService: SerializeService,
        private readonly httpRoomsService: HttpRoomsService,
    ) {}
}
