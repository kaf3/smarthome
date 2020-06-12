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
import { EquipmentFormActions, EquipmentFormUnion } from './actions';
import { EquipmentGroup } from '@models/equipment';
import { required } from 'ngrx-forms/validation';

export const equipmentFormReducer = function (
	state: EquipmentFormState = initialEquipmentFormState,
	action: EquipmentFormUnion | Actions<EquipmentFormValue>,
): EquipmentFormState {
	state = formGroupReducer(state, action);
	state = updateGroup<EquipmentFormValue>({
		name: validate(required),
	})(state);

	switch (action.type) {
		case EquipmentFormActions.loadEquipmentForm: {
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
		case EquipmentFormActions.loadEquipmentFormError: {
			return state;
		}

		/*case EquipmentFormActions.submitEquipmentForm: {
			//disable to check state in effects
			return reset(state);
		}
		case EquipmentFormActions.submitEquipmentFormSuccess: {
			return reset(state);
		}*/
		default:
			return state;
	}
};
