import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { roomActions, GetRoomSucces, GetRoom } from './actions';
import { switchMap, map } from 'rxjs/operators';
import { Store} from '@ngrx/store';
import { of } from 'rxjs';
import { navigation} from '@nrwl/angular';
import { RoomComponent } from 'src/app/room-list/room/room.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import {RoomListStoreSelectors} from '../room-list-store';
import {RoomState} from './state';

@Injectable()
export class RoomEffects {

    getRoom$ = createEffect( () => this.actions$.pipe(
        ofType<GetRoom>(roomActions.getRoom),
        map(action => action.payload.id),
        switchMap((id) => this.store.select(RoomListStoreSelectors.selectRoomList).pipe(map(rooms => rooms[id]))),
        switchMap(room => of(new GetRoomSucces({ room }) ))
    ))


    navigation = createEffect( () => this.actions$.pipe(
        navigation(
        RoomComponent, {
            run: (routerSnap: ActivatedRouteSnapshot) => {
                return of(new GetRoom({id: routerSnap.params.id}));
            }

        })
    ))


    constructor(private actions$: Actions, private store: Store<RoomState>,
        ) {}

}
