import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { Equipment } from '@models/equipment';
import { FeatureKey } from '../state';

export const EQUIPMENT_FORM_FEATURE_KEY: FeatureKey = 'equipmentForm';

export interface EquipmentFormPartialState {
	readonly [EQUIPMENT_FORM_FEATURE_KEY]: EquipmentFormState;
}

export interface EquipmentFormValue {
	name: Equipment['name'] | null;
	value?: Equipment['value'] | null;
}

export const initialEquipmentFormValue: EquipmentFormValue = {
	name: null,
	value: null,
};

export type EquipmentFormState = FormGroupState<EquipmentFormValue>;

export const initialEquipmentFormState: EquipmentFormState = createFormGroupState<
	EquipmentFormValue
>('EquipmentForm', initialEquipmentFormValue);
