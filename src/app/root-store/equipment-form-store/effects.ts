import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {EquipmentFormState, EquipmentFormValue} from './state';
import {
    EquipmentFormActions,
    LoadEquipmentForm,
    LoadEquipmentFormSuccess,
    SubmitEquipmentForm,
} from './actions';
import {map, switchMap} from 'rxjs/operators';
import {filter} from 'rxjs/operators';
import {Equipment} from '../../../models/equipment';
import {of} from 'rxjs';
import {MarkAsSubmittedAction} from 'ngrx-forms';
import {selectEquipmentFormState} from './selectors';
import {EquipmentStoreSelectors, EquipmentStoreActions} from '../equipment-store';
import {EquipmentListStoreActions} from '../equipment-list-store';

@Injectable()
export class EquipmentFormEffects {
    loadEquipmentForm$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadEquipmentForm>(EquipmentFormActions.loadEquipmentForm),
            switchMap(() =>
                this.store
                    .select(EquipmentStoreSelectors.selectEquipment)
                    .pipe(filter(equipment => !!equipment)),
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

    submitEquipmentForm$ = createEffect(() =>
        this.actions$.pipe(
            ofType<SubmitEquipmentForm>(EquipmentFormActions.submitEquipmentForm),
            switchMap(() => this.store.select(selectEquipmentFormState)),
            switchMap((formState: EquipmentFormState) =>
                this.store.select(EquipmentStoreSelectors.selectEquipment).pipe(
                    map((equipment: Equipment) => {
                        equipment.name = formState.value.name;
                        equipment.value = formState.value.value;

                        return new EquipmentListStoreActions.UpsertOneEquipment({
                            equipment,
                        });
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
