import { CallState } from '@models/error-loading';
import { Room } from '@models/room';
import { HardwareStoreActions } from '@store/hardware';
import { RoomListStoreActions } from '@store/room-list';

export const ROOM_FEATURE_KEY = 'room';

export interface RoomState {
	callState: CallState;
	room: Room;
}

export function roomReducer(
	state,
	_action: RoomListStoreActions.RoomListActions | HardwareStoreActions.HardwareActions,
): RoomState {
	/*	switch (action.type) {
		case RoomListActionsTypes.getRoom:
		case RoomListActionsTypes.moveHardware: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomListActionsTypes.getRoomSuccess:
		case RoomListActionsTypes.updateRoomSuccess:
			return {
				...state,
				callState: LoadingState.LOADED,
				room: action.payload.room,
			};

		case RoomListActionsTypes.getRoomError: {
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

		case RoomListActionsTypes.updateOneHardwareSuccess:
		case HardwareActionTypes.UpdateOneEquipmentSuccess: {
			return {
				...state,
				room: Room.updateHardware(state.room, action.payload.hardware),
			};
		}
		default:
			return state;
	}*/
	return state;
}
