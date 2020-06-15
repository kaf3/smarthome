import { initialRoomListState, RoomListState, roomsAdapter } from './state';
import { RoomListActions, RoomListActionsTypes } from './actions';
import { LoadingState } from '@models/error-loading';
import { RoomStoreActions } from '@store/room';
import { RoomActionTypes } from '../room-store/actions';
import { HardwareStoreActions } from '@store/hardware';
import { HardwareActionTypes } from '../hardware-store/actions';

export function roomsReducer(
	state = initialRoomListState,
	action: RoomListActions | RoomStoreActions.RoomActions | HardwareStoreActions.HardwareActions,
): RoomListState {
	switch (action.type) {
		case RoomListActionsTypes.loadRoomList:
		case RoomListActionsTypes.moveHardware:
		case RoomActionTypes.updateOneHardware:
		case HardwareActionTypes.UpdateOneEquipment: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomListActionsTypes.loadRoomListSuccess:
		case RoomListActionsTypes.moveHardwareSuccess: {
			const { rooms, activeRoom } = action.payload.roomList;
			return roomsAdapter.addAll(rooms, {
				...state,
				activeRoom,
				callState: LoadingState.LOADED,
			});
		}

		case RoomListActionsTypes.loadRoomListError:
		case RoomListActionsTypes.moveHardwareError:
			return { ...state, callState: action.payload };

		case RoomListActionsTypes.upsertRoom:
		case RoomListActionsTypes.upsertRoomWhenLeft:
		case HardwareActionTypes.UpdateOneEquipmentSuccess:
		case RoomActionTypes.updateOneHardwareSuccess: {
			return roomsAdapter.upsertOne(action.payload.room, {
				...state,
				callState: LoadingState.LOADED,
			});
		}

		case RoomListActionsTypes.upsertRoomListWhenLeft: {
			const { activeRoom, rooms } = action.payload.roomList;
			return roomsAdapter.addAll(rooms, {
				...state,
				activeRoom,
			});
		}

		default:
			return state;
	}
}
