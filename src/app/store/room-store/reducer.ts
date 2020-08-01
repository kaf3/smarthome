import { CallState, LoadingState } from '@models/error-loading';
import { Room } from '@models/room';
import { HardwareStoreActions } from '@store/hardware';
import { RoomListStoreActions } from '@store/room-list';
import { RoomList } from '@models/room-list';
import { HardwareActionTypes } from '../hardware-store/actions';
import { RoomListActionsTypes } from '../room-list-store/actions';
import { RoomActions, RoomActionTypes } from './actions';

export const ROOM_FEATURE_KEY = 'room';

export interface RoomState {
	callState: CallState;
	room: Room;
}
export const initialState: RoomState = {
	callState: LoadingState.INIT,
	room: Room.initial,
};

export function roomReducer(
	state = initialState,
	action:
		| RoomActions
		| RoomListStoreActions.RoomListActions
		| HardwareStoreActions.HardwareActions,
): RoomState {
	switch (action.type) {
		case RoomActionTypes.getRoom:
		case RoomListActionsTypes.moveHardware: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomActionTypes.getRoomSuccess:
		case RoomListActionsTypes.updateRoomSuccess:
			return {
				...state,
				callState: LoadingState.LOADED,
				room: action.payload.room,
			};

		case RoomActionTypes.getRoomError: {
			return { ...state, callState: action.payload };
		}
		case RoomListActionsTypes.moveHardwareSuccess: {
			const room = RoomList.getRoom(state.room.id, action.payload.roomList);
			return {
				...state,
				callState: LoadingState.LOADED,
				room: room ?? state.room,
			};
		}
		case RoomListActionsTypes.upsertRoomListWhenLeft: {
			return initialState;
		}

		case RoomActionTypes.updateOneHardwareSuccess:
		case HardwareActionTypes.UpdateOneEquipmentSuccess: {
			return {
				...state,
				room: Room.updateHardware(state.room, action.payload.hardware),
			};
		}
		default:
			return state;
	}
}
