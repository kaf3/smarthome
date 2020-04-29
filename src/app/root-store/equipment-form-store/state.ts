import {createFormGroupState, FormGroupState} from 'ngrx-forms';
import {Equipment} from '@models';

export interface EquipmentFormValue {
    name: Equipment['name'] | null;
    value?: Equipment['value'] | null;
}

export const initialEquipmentFormValue: EquipmentFormValue = {
    name: null,
    value: null,
};

export interface EquipmentFormState extends FormGroupState<EquipmentFormValue> {}

export const initialEquipmentFormState: EquipmentFormState = createFormGroupState<
    EquipmentFormValue
>('EquipmentForm', initialEquipmentFormValue);
