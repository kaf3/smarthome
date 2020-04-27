import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {
    LoadRooms,
    LoadRoomsSuccess,
    RoomsActions,
    UpsertOneRoom,
    UpsertOneRoomSuccess,
} from './actions';
import {switchMap} from 'rxjs/operators';

import {of} from 'rxjs';
import {HttpRoomsService} from '../../sevices/http-rooms.service';
import {Room} from '../../../models/room';

@Injectable()
export class RoomsEffects {
    loadRooms$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadRooms>(RoomsActions.loadRooms),
            switchMap(() => this.httpRoomsService.loadRooms()),
            switchMap((rooms: Room[]) => of(new LoadRoomsSuccess({rooms}))),
        ),
    );

    upsertOneRoom$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UpsertOneRoom>(RoomsActions.upsertOneRoom),
            switchMap((action: UpsertOneRoom) =>
                this.httpRoomsService.patchRoom(
                    action.payload.roomDTO.r_name,
                    action.payload.roomDTO,
                ),
            ),
            switchMap((room: Room) => of(new UpsertOneRoomSuccess({room}))),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly httpRoomsService: HttpRoomsService,
    ) {}
}
