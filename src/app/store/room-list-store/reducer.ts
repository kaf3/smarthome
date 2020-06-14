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
		case RoomListActionsTypes.moveHardwareSuccess:
		case RoomActionTypes.updateOneHardwareSuccess:
		case HardwareActionTypes.UpdateOneEquipmentSuccess: {
			const { rooms, activeRoom } = action.payload.roomList;
			return roomsAdapter.addAll(rooms, {
				...state,
				activeRoom,
				callState: LoadingState.LOADED,
			});
		}

		case RoomListActionsTypes.loadRoomListError:
		case RoomListActionsTypes.moveHardwareError:
		case RoomActionTypes.updateOneHardwareFailure:
		case HardwareActionTypes.UpdateOneEquipmentFailure:
			return { ...state, callState: action.payload };

		case RoomListActionsTypes.upsertRoom:
		case RoomListActionsTypes.upsertRoomWhenLeft: {
			return roomsAdapter.upsertOne(action.payload.room, state);
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
