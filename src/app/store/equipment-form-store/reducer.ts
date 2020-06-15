import {
	Actions,
	addGroupControl,
	formGroupReducer,
	removeGroupControl,
	reset,
	setValue,
	updateGroup,
	validate,
} from 'ngrx-forms';
import { EquipmentFormState, EquipmentFormValue, initialEquipmentFormState } from './state';
import { EquipmentFormActions, EquipmentFormActionTypes } from './actions';
import { EquipmentGroup } from '@models/equipment';
import { required } from 'ngrx-forms/validation';

export const equipmentFormReducer = function (
	state: EquipmentFormState = initialEquipmentFormState,
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
