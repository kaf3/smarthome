import {EquipmentState, initialEquipmentState} from './state';
import {EquipmentActions, EquipmentUnion} from './actions';

export function equipmentReducer(
    state: EquipmentState = initialEquipmentState,
    action: EquipmentUnion,
): EquipmentState {
    switch (action.type) {
        case EquipmentActions.getEquipmentSuccess: {
            const equipment = action.payload.equipment;
            return {...state, equipment};
        }
        case EquipmentActions.getEquipmentError: {
            return state;
        }
        default:
            return state;
    }
}
