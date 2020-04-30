import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {GetRoom, GetRoomError, GetRoomSuccess, RoomActions} from './actions';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
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
                this.store.select(RoomListStoreSelectors.selectRoomByName, roomName).pipe(
                    filter(room => !!room),
                    take(1),
                    map(x => {
                        console.log(x);

                        return x;
                    }),
                ),
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
                onError(a: ActivatedRouteSnapshot, e: any): Observable<any> | any {
                    return of(new GetRoomError());
                },
            }),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<RoomState>,
    ) {}
}
