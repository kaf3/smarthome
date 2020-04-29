import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EquipmentListState} from './state';
import {Store} from '@ngrx/store';
import {
    EquipmentListActions,
    LoadEquipmentList,
    LoadEquipmentListError,
    LoadEquipmentListSuccess,
} from './actions';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {selectRoom} from '../room-store/selectors';
import {Room} from '../../../models/room';
import {Equipment} from '../../../models/equipment';
import {of} from 'rxjs';

@Injectable()
export class EquipmentListEffects {
    loadEquipmentList$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadEquipmentList>(EquipmentListActions.loadEquipmentList),
            switchMap(() =>
                this.store.select(selectRoom).pipe(
                    filter(room => !!room.roomName),
                    map((room: Room) => room.equipment),
                ),
            ),
            switchMap((equipmentList: Equipment[]) =>
                of(new LoadEquipmentListSuccess({equipmentList})),
            ),
            catchError(() => of(new LoadEquipmentListError())),
        ),
    );
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<EquipmentListState>,
    ) {}
}
