import {
    Actions,
    ALL_NGRX_FORMS_ACTION_TYPES,
    formGroupReducer,
    setValue,
    MarkAsSubmittedAction,
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
        }
    }

    return state;
};
