import { EquipmentState, initialEquipmentState } from './state';
import { EquipmentActions, EquipmentUnion } from './actions';
import { LoadingState } from '@models';

export function equipmentReducer(
	state: EquipmentState = initialEquipmentState,
	action: EquipmentUnion,
): EquipmentState {
	switch (action.type) {
		case EquipmentActions.getEquipment: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case EquipmentActions.getEquipmentSuccess: {
			const { equipment } = action.payload;

			return { ...state, equipment, callState: LoadingState.LOADED };
		}
		case EquipmentActions.getEquipmentError: {
			const { errorMsg } = action.payload;

			return { ...state, callState: { errorMsg } };
		}
		default:
			return state;
	}
}
