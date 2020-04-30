import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
    LoadRooms,
    LoadRoomsSuccess,
    RoomsActions,
    UpsertAllRooms,
    UpsertAllRoomsSuccess,
} from './actions';
import {map, switchMap} from 'rxjs/operators';

import {of} from 'rxjs';
import {HttpRoomsService} from '../../sevices/http-rooms.service';
import {Equipment, Room, RoomsDTO} from '@models';
import {SerializeService} from '../../sevices/serialize.service';

@Injectable()
export class RoomsEffects {
    loadRooms$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadRooms>(RoomsActions.loadRooms),
            switchMap(() => this.httpRoomsService.loadRooms()),
            switchMap((rooms: Room[]) => of(new LoadRoomsSuccess({rooms}))),
        ),
    );

    upsertAllRooms$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UpsertAllRooms>(RoomsActions.upsertAllRooms),
            switchMap(({payload}) => {
                const {obj} = payload;

                if (obj.hasOwnProperty('roomName')) {
                    return of(null);
                }

                if (obj.hasOwnProperty('value')) {
                    return this.httpRooms.loadRoomsDTO().pipe(
                        map(roomsDTO => {
                            const equipmentDTO = this.serializer.serializeEquipment(
                                obj as Equipment,
                            );

                            roomsDTO[equipmentDTO.r_name] = this.serializer.serializeRoom(
                                equipmentDTO,
                                roomsDTO[equipmentDTO.r_name],
                            );

                            return roomsDTO;
                        }),
                    );
                }

                return of(null);
            }),
            switchMap((roomsDTO: RoomsDTO) => this.httpRooms.postRooms(roomsDTO)),
            switchMap((rooms: Room[]) => of(new UpsertAllRoomsSuccess({rooms}))),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly httpRoomsService: HttpRoomsService,
        private readonly httpRooms: HttpRoomsService,
        private readonly serializer: SerializeService,
    ) {}
}
