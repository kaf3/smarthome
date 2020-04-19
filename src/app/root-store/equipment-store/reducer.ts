import {EquipmentState, initialEquipmentState} from './state';
import {equipmentActions, EquipmentUnion} from './actions';

export function equipmentReducer(
  state: EquipmentState = initialEquipmentState,
  action: EquipmentUnion): EquipmentState {
  switch (action.type) {
    case equipmentActions.getEquipmentSuccess: {
      const equipment = action.payload.equipment;
      return {...state, equipment};
    }
    case equipmentActions.getEquipmentError: {
      return state;
    }
    default:
      return state;
  }
}
