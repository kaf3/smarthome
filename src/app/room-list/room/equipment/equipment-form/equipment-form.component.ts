import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
    EquipmentFormStoreActions,
    EquipmentFormStoreSelectors,
    EquipmentFormStoreState,
    EquipmentStoreSelectors,
} from '@store';
import {Observable} from 'rxjs';
import {Equipment} from '@models';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-equipment-form',
    templateUrl: './equipment-form.component.html',
    styleUrls: ['./equipment-form.component.scss'],
})
export class EquipmentFormComponent implements OnInit {
    formState$: Observable<EquipmentFormStoreState.EquipmentFormState>;
    equipment$: Observable<Equipment>;

    constructor(
        public readonly store: Store<EquipmentFormStoreState.EquipmentFormState>,
    ) {
        this.formState$ = this.store.pipe(
            select(EquipmentFormStoreSelectors.selectEquipmentFormState),
        );
        this.equipment$ = this.store.pipe(
            select(EquipmentStoreSelectors.selectEquipment),
            filter(eqp => !!eqp.id),
        );

        this.store.dispatch(new EquipmentFormStoreActions.LoadEquipmentForm());
    }

    ngOnInit(): void {}

    public submitForm() {
        this.store.dispatch(new EquipmentFormStoreActions.SubmitEquipmentForm());
    }
}
