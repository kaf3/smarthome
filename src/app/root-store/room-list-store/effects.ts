import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { LoadRooms, roomsActions, LoadRoomsSucces} from './actions';
import { switchMap} from 'rxjs/operators';

import { of } from 'rxjs';
import { LoadRoomService } from '../../sevices/load-room.service';
import {IRoom} from '../../../models/iroom';


@Injectable()
export class RoomsEffects {
    @Effect()
    loadRooms$ = this.actions$.pipe(
        ofType<LoadRooms>(roomsActions.loadRooms),

        switchMap(() => this.loadRoomService.loadRoom()),
        switchMap((rooms: IRoom[]) => of(new LoadRoomsSucces({rooms})))
    )

    constructor(private actions$: Actions,
                private loadRoomService: LoadRoomService) {}
}
