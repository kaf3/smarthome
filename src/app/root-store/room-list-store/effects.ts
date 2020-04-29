import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoadRooms, LoadRoomsSuccess, RoomsActions} from './actions';
import {switchMap} from 'rxjs/operators';

import {of} from 'rxjs';
import {HttpRoomsService} from '../../sevices/http-rooms.service';
import {Room} from '@models';

@Injectable()
export class RoomsEffects {
    loadRooms$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadRooms>(RoomsActions.loadRooms),
            switchMap(() => this.httpRoomsService.loadRooms()),
            switchMap((rooms: Room[]) => of(new LoadRoomsSuccess({rooms}))),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly httpRoomsService: HttpRoomsService,
    ) {}
}
