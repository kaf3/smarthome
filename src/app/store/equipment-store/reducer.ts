import { CallState, LoadingState } from '@models/error-loading';
import { RoomListStoreActions } from '@store/room-list';
import { Equipment } from '@models/equipment';
import { EquipmentActions, EquipmentActionsTypes } from './actions';

export const EQUIPMENT_FEATURE_KEY = 'equipment';

export interface EquipmentState {
	equipment: Equipment;
	callState: CallState;
}

export const initialState: EquipmentState = {
	equipment: Equipment.initial,
	callState: LoadingState.INIT,
};

export function equipmentReducer(
	state: EquipmentState = initialState,
	action: EquipmentActions | RoomListStoreActions.RoomListActions,
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
		/* case RoomListStoreActions.RoomListActionsTypes.upsertRoomWhenLeft: {
			return initialEquipmentState;
		} */
		default:
			return state;
	}
}
