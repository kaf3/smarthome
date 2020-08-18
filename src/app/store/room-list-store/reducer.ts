import { CallState, LoadingState } from '@models/error-loading';
import { HardwareStoreActions } from '@store/hardware';
import { HardwareActionTypes } from '../hardware-store/actions';
import { RoomListActions, RoomListActionsTypes } from './actions';
import { RoomList } from '@models/room-list';

export const ROOMLIST_FEATURE_KEY = 'roomList';

export interface RoomListState {
	callState: CallState;
	roomList: RoomList;
}

export const initialState: RoomListState = {
	roomList: RoomList.initial,
	callState: LoadingState.INIT,
};

export function roomsReducer(
	state = initialState,
	action: RoomListActions | HardwareStoreActions.HardwareActions,
): RoomListState {
	switch (action.type) {
		case RoomListActionsTypes.loadRoomList:
		case RoomListActionsTypes.moveHardware:
		case RoomListActionsTypes.updateOneHardware:
		case RoomListActionsTypes.updateRoom:
		case RoomListActionsTypes.addRoom:
		case HardwareActionTypes.UpdateOneEquipment:
		case RoomListActionsTypes.DeleteRoom: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomListActionsTypes.loadRoomListSuccess:
		case RoomListActionsTypes.moveHardwareSuccess:
			return {
				...state,
				roomList: action.payload.roomList,
				callState: LoadingState.LOADED,
			};

		case RoomListActionsTypes.loadRoomListError:
		case RoomListActionsTypes.moveHardwareError:
		case RoomListActionsTypes.updateRoomFailure:
		case RoomListActionsTypes.addRoomFailure:
		case RoomListActionsTypes.DeleteRoomFailure:
			return { ...state, callState: action.payload };

		case RoomListActionsTypes.updateRoomSuccess:
		case RoomListActionsTypes.upsertRoomWhenLeft:
		case HardwareActionTypes.UpdateOneEquipmentSuccess:
		case RoomListActionsTypes.updateOneHardwareSuccess:
			return {
				...state,
				roomList: RoomList.updateOneRoom(state.roomList, action.payload.room),
				callState: LoadingState.LOADED,
			};

		case RoomListActionsTypes.addRoomSuccess:
			return {
				...state,
				roomList: RoomList.addRoom(state.roomList, action.payload.room),
				callState: LoadingState.LOADED,
			};

		case RoomListActionsTypes.upsertRoomListWhenLeft: {
			return {
				...state,
				roomList: action.payload.roomList,
			};
		}

		case RoomListActionsTypes.DeleteRoomSuccess:
			return {
				...state,
				roomList: RoomList.removeOneRoom(state.roomList, action.payload.room),
				callState: LoadingState.LOADED,
			};

		default:
			return state;
	}
}
