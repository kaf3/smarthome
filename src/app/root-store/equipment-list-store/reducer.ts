import {
    equipmentListAdapter,
    EquipmentListState,
    initialEquipmentListState,
} from './state';
import {EquipmentListActions, EquipmentListUnion} from './actions';

export function equipmentListReducer(
    state: EquipmentListState = initialEquipmentListState,
    action: EquipmentListUnion,
): EquipmentListState {
    switch (action.type) {
        case EquipmentListActions.loadEquipmentListSuccess: {
            return equipmentListAdapter.addAll(action.payload.equipmentList, state);
        }
        case EquipmentListActions.loadEquipmentListError: {
            return state;
        }
        default:
            return state;
    }
}
