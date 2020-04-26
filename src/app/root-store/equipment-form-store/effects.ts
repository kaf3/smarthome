import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {EquipmentFormState, EquipmentFormValue} from './state';
import {
    EquipmentFormActions,
    LoadEquipmentForm,
    LoadEquipmentFormSuccess,
} from './actions';
import {switchMap} from 'rxjs/operators';
import {selectEquipment} from '../equipment-store/selectors';
import {filter} from 'rxjs/operators';
import {Equipment} from '../../../models/equipment';
import {of} from 'rxjs';

@Injectable()
export class EquipmentFormEffects {
    loadEquipmentForm = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadEquipmentForm>(EquipmentFormActions.loadEquipmentForm),
            switchMap(() =>
                this.store.select(selectEquipment).pipe(filter(equipment => !!equipment)),
            ),
            switchMap((equipment: Equipment) =>
                of(
                    new LoadEquipmentFormSuccess({
                        name: equipment.name,
                        value: equipment.value,
                    }),
                ),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<EquipmentFormState>,
    ) {}
}
