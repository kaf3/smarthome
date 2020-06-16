import {
	Actions,
	addGroupControl,
	createFormGroupState,
	formGroupReducer,
	FormGroupState,
	removeGroupControl,
	reset,
	setValue,
	updateGroup,
	validate,
} from 'ngrx-forms';
import { EquipmentFormActions, EquipmentFormActionTypes } from './actions';
import { Equipment, EquipmentGroup } from '@models/equipment';
import { required } from 'ngrx-forms/validation';

export const EQUIPMENT_FORM_FEATURE_KEY = 'equipmentForm';

export interface EquipmentFormValue {
	name: Equipment['name'] | null;
	value?: Equipment['value'] | null;
}

export const initialEquipmentFormValue: EquipmentFormValue = {
	name: null,
	value: null,
};
export type EquipmentFormState = FormGroupState<EquipmentFormValue>;
export const initialState: EquipmentFormState = createFormGroupState<EquipmentFormValue>(
	'EquipmentForm',
	initialEquipmentFormValue,
);
export const equipmentFormReducer = function (
	state: EquipmentFormState = initialState,
	action: EquipmentFormActions | Actions<EquipmentFormValue>,
): EquipmentFormState {
	state = formGroupReducer(state, action);
	state = updateGroup<EquipmentFormValue>({
		name: validate(required),
	})(state);

	switch (action.type) {
		case EquipmentFormActionTypes.loadEquipmentForm: {
			const { group, name, value } = action.payload.equipment;

			if (!state.controls.value) {
				state = addGroupControl(state, 'value', '');
			}

			if (group === EquipmentGroup.DEVICE) {
				return setValue(reset(state), { name, value });
			}
			state = removeGroupControl(state, 'value');

			return setValue(reset(state), { name });
		}
		default:
			return state;
	}
};
