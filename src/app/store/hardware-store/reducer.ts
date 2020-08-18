import { Hardware } from '@models/hardware';
import { CallState, LoadingState } from '@models/error-loading';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Equipment } from '@models/equipment';
import { RoomListStoreActions } from '@store/room-list';
import { HardwareActions, HardwareActionTypes } from './actions';

export const hardwareFeatureKey = 'hardware';

export interface HardwareState {
	hardware: Hardware;
	callState: CallState;
}

export const hardwareAdapter: EntityAdapter<Equipment> = createEntityAdapter<Equipment>({
	selectId: (equipment: Equipment) => equipment.id ?? '',
	sortComparer: false,
});

export const initialState: HardwareState = {
	hardware: Hardware.initial,
	callState: LoadingState.INIT,
};

export function reducer(
	state = initialState,
	action: HardwareActions | RoomListStoreActions.RoomListActions,
): HardwareState {
	switch (action.type) {
		case HardwareActionTypes.LoadHardware:
			return { ...state, callState: LoadingState.LOADING };

		case HardwareActionTypes.LoadHardwareSuccess:
		case RoomListStoreActions.RoomListActionsTypes.updateOneHardwareSuccess:
			return {
				...state,
				hardware: action.payload.hardware,
				callState: LoadingState.LOADED,
			};

		case HardwareActionTypes.LoadHardwareFailure:
		case RoomListStoreActions.RoomListActionsTypes.updateOneHardwareFailure:
			return { ...state, callState: action.payload };

		case RoomListStoreActions.RoomListActionsTypes.upsertRoomWhenLeft: {
			return initialState;
		}
		case RoomListStoreActions.RoomListActionsTypes.moveHardwareSuccess:
			return initialState;

		case HardwareActionTypes.UpdateOneEquipmentSuccess: {
			return {
				...state,
				hardware: Hardware.updateEquipment(state.hardware, action.payload.equipment),
				callState: LoadingState.LOADED,
			};
		}

		case HardwareActionTypes.UpdateOneEquipmentFailure: {
			return { ...state, callState: action.payload };
		}
		default:
			return state;
	}
}
