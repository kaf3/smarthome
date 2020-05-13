import { EquipmentState, initialEquipmentState } from './state';
import { EquipmentActionsTypes, EquipmentUnion } from './actions';
import { LoadingState } from '@models';
import { RoomListStoreActions } from '@store/room-list';

export function equipmentReducer(
	state: EquipmentState = initialEquipmentState,
	action: EquipmentUnion | RoomListStoreActions.RoomsUnion,
): EquipmentState {
	switch (action.type) {
		case EquipmentActionsTypes.getEquipment: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case EquipmentActionsTypes.getEquipmentSuccess: {
			const { equipment } = action.payload;

			return { ...state, equipment, callState: LoadingState.LOADED };
		}
		case EquipmentActionsTypes.getEquipmentError: {
			const { errorMsg } = action.payload;

			return { ...state, callState: { errorMsg } };
		}
		case RoomListStoreActions.RoomsActionsTypes.upsertRoom: {
			return initialEquipmentState;
		}
		default:
			return state;
	}
}
