import {
    Actions,
    addGroupControl,
    formGroupReducer,
    MarkAsSubmittedAction,
    removeGroupControl,
    reset,
    setValue,
} from 'ngrx-forms';
import {EquipmentFormState, EquipmentFormValue, initialEquipmentFormState} from './state';
import {EquipmentFormActions, EquipmentFormUnion} from './actions';

export const equipmentFormReducer = function(
    state: EquipmentFormState = initialEquipmentFormState,
    action: EquipmentFormUnion | Actions<EquipmentFormValue>,
) {
    state = formGroupReducer(state, action);

    switch (action.type) {
        case EquipmentFormActions.loadEquipmentFormSuccess: {
            const {group, name, value} = action.payload.equipment;

            if (!state.controls.value) {
                state = addGroupControl(state, 'value', '');
            }

            if (group === 'device') {
                return setValue(state, {name, value});
            }
            state = removeGroupControl(state, 'value');

            return setValue(state, {name});
        }
        case EquipmentFormActions.loadEquipmentFormError: {
            return state;
        }
        case MarkAsSubmittedAction.TYPE: {
            return reset(state);
        }
        case EquipmentFormActions.submitEquipmentForm: {
            return reset(state);
        }
        case EquipmentFormActions.submitEquipmentFormSuccess: {
            return reset(state);
        }
        default:
            return state;
    }
};
