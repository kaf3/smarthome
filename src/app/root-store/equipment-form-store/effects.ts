import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {EquipmentFormState, EquipmentFormValue} from './state';
import {
    EquipmentFormActions,
    LoadEquipmentForm,
    LoadEquipmentFormSuccess,
} from './actions';
import {map, switchMap} from 'rxjs/operators';
import {filter} from 'rxjs/operators';
import {Equipment} from '../../../models/equipment';
import {of} from 'rxjs';
import {MarkAsSubmittedAction} from 'ngrx-forms';
import {selectEquipmentFormState} from './selectors';
import {EquipmentStoreSelectors} from '../equipment-store';
import {EquipmentSerializeService} from '../../sevices/equipment-serialize.service';

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

    /*    submitEquipmentForm$ = createEffect(() => {
        this.actions$.pipe(
            ofType<MarkAsSubmittedAction>(MarkAsSubmittedAction.TYPE),
            switchMap(() =>
                this.store
                    .select(selectEquipmentFormState)
                    .pipe(map((state: EquipmentFormState) => state.value))
            ),
            switchMap((formValue: EquipmentFormValue) =>
                this.store
                    .select(EquipmentStoreSelectors.selectEquipment)
                    .pipe(map((equipment: Equipment) => {
                        equipment.name = formValue.name;
                        equipment.value = formValue.value;
                        return equipment
                    }))
            ),
            switchMap((equipment: Equipment) => of(this.serializeService.serialize(equipment)))


        )
    }))*/

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<EquipmentFormState>,
        private readonly serializeService: EquipmentSerializeService,
    ) {}
}
