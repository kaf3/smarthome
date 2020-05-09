import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EquipmentState} from './state';
import {Store} from '@ngrx/store';
import {
    EquipmentActions,
    GetEquipment,
    GetEquipmentError,
    GetEquipmentSuccess,
} from './actions';
import {of} from 'rxjs';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {RoomStoreSelectors} from '../room-store';

@Injectable()
export class EquipmentEffects {
    getEquipment$ = createEffect(() =>
        this.actions$.pipe(
            ofType<GetEquipment>(EquipmentActions.getEquipment),
            map(action => action.payload.id),
            switchMap(id =>
                this.store.select(RoomStoreSelectors.selectEquipmentByIdFromRoom, id),
            ),
            filter(equipment => !!equipment),
            switchMap(equipment => of(new GetEquipmentSuccess({equipment}))),
            catchError(() => of(new GetEquipmentError())),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<EquipmentState>,
    ) {}
}
