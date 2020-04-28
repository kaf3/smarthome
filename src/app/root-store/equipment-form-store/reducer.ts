import {
    Actions,
    formGroupReducer,
    MarkAsSubmittedAction,
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
            return setValue(action.payload)(state);
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
