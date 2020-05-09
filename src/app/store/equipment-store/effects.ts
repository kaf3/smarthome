import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EquipmentState} from './state';
import {Store} from '@ngrx/store';
import {EquipmentActions, GetEquipment, GetEquipmentSuccess} from './actions';
import {of} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
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
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<EquipmentState>,
    ) {}
}
