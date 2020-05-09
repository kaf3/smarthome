import {Actions, createEffect} from '@ngrx/effects';
import {navigation} from '@nrwl/angular';
import {RoomComponent} from './room.component';
import {ActivatedRouteSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {filter, map, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {RoomStoreSelectors, RoomStoreState, RoomStoreActions} from '@store';

@Injectable()
export class RoomUiEffects {
    navigationRoom = createEffect(() =>
        this.actions$.pipe(
            navigation(RoomComponent, {
                run: (routerSnap: ActivatedRouteSnapshot) => {
                    return this.store.pipe(
                        select(RoomStoreSelectors.selectRoomName),
                        take(1),
                        filter(roomName => roomName !== routerSnap.params.id),
                        map(
                            () =>
                                new RoomStoreActions.GetRoom({
                                    roomName: routerSnap.params.id,
                                }),
                        ),
                    );
                },
                onError(a: ActivatedRouteSnapshot, e: any): Observable<any> | any {
                    return of(new RoomStoreActions.GetRoomError());
                },
            }),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<RoomStoreState.RoomState>,
    ) {}
}
