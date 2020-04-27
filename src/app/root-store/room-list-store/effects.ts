import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoadRooms, LoadRoomsSuccess, RoomsActions} from './actions';
import {switchMap} from 'rxjs/operators';

import {of} from 'rxjs';
import {HttpRoomsService} from '../../sevices/http-rooms.service';
import {Room} from '../../../models/room';

@Injectable()
export class RoomsEffects {
    @Effect()
    loadRooms$ = this.actions$.pipe(
        ofType<LoadRooms>(RoomsActions.loadRooms),

        switchMap(() => this.loadRoomService.loadRooms()),
        switchMap((rooms: Room[]) => of(new LoadRoomsSuccess({rooms}))),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly loadRoomService: HttpRoomsService,
    ) {}
}
