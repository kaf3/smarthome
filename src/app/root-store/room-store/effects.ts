import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {GetRoom, GetRoomSuccess, RoomActions} from './actions';
import {map, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {navigation} from '@nrwl/angular';
import {RoomComponent} from 'src/app/room-list/room/room.component';
import {ActivatedRouteSnapshot} from '@angular/router';
import {RoomListStoreSelectors} from '../room-list-store';
import {RoomState} from './state';

@Injectable()
export class RoomEffects {
    getRoom$ = createEffect(() =>
        this.actions$.pipe(
            ofType<GetRoom>(RoomActions.getRoom),
            map(action => action.payload.roomName),
            switchMap(roomName =>
                this.store
                    .select(RoomListStoreSelectors.selectRoomListEntities)
                    .pipe(map(roomEntities => roomEntities[roomName])),
            ),
            switchMap(room => of(new GetRoomSuccess({room}))),
        ),
    );

    navigationRoom = createEffect(() =>
        this.actions$.pipe(
            navigation(RoomComponent, {
                run: (routerSnap: ActivatedRouteSnapshot) => {
                    return of(new GetRoom({roomName: routerSnap.params.id}));
                },
            }),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<RoomState>,
    ) {}
}
