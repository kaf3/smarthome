import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
    EquipmentFormStoreActions,
    EquipmentFormStoreSelectors,
    EquipmentFormStoreState,
} from '@store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-equipment-form',
    templateUrl: './equipment-form.component.html',
    styleUrls: ['./equipment-form.component.scss'],
})
export class EquipmentFormComponent implements OnInit {
    formState$: Observable<EquipmentFormStoreState.EquipmentFormState>;

    constructor(
        public readonly store: Store<EquipmentFormStoreState.EquipmentFormState>,
    ) {
        this.formState$ = this.store.pipe(
            select(EquipmentFormStoreSelectors.selectEquipmentFormState),
        );

        this.store.dispatch(new EquipmentFormStoreActions.LoadEquipmentForm());
    }

    ngOnInit(): void {}

    public submitForm() {
        this.store.dispatch(new EquipmentFormStoreActions.SubmitEquipmentForm());
    }
}
