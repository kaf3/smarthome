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
        case EquipmentListActions.upsertOneEquipmentSuccess: {
            return equipmentListAdapter.upsertOne(action.payload.equipment, state);
        }
        case EquipmentListActions.upsertOneEquipmentError: {
            return state;
        }
        default:
            return state;
    }
}
