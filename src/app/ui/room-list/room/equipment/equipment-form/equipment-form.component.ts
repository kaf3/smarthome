import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
    EquipmentFormStoreActions,
    EquipmentFormStoreSelectors,
    EquipmentFormStoreState,
    EquipmentStoreSelectors,
} from '@store';
import {Observable} from 'rxjs';
import {Equipment, EquipmentGroup} from '../../../../../models';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-equipment-form',
    templateUrl: './equipment-form.component.html',
    styleUrls: ['./equipment-form.component.scss'],
})
export class EquipmentFormComponent implements OnInit {
    public readonly formState$: Observable<EquipmentFormStoreState.EquipmentFormState>;
    public readonly equipment$: Observable<Equipment>;
    public readonly DEVICE = EquipmentGroup.DEVICE;

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
