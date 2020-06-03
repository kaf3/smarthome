import { RoomActionTypes, RoomUnion } from './actions';
import { initialRoomState, roomAdapter, RoomState } from './state';
import { RoomListActionsTypes, RoomsUnion } from '../room-list-store/actions';
import { LoadingState } from '@models/error-loading';
import { Room } from '@models/room';

export function roomReducer(state = initialRoomState, action: RoomUnion | RoomsUnion): RoomState {
	switch (action.type) {
		case RoomActionTypes.getRoom:
		case RoomListActionsTypes.upsertRoomList: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomActionTypes.getRoomSuccess: {
			const { hardwares, activeHardware } = action.payload.room;
			return roomAdapter.addAll(hardwares, {
				...state,
				baseRoom: Room.getBase(action.payload.room),
				activeHardware,
				callState: LoadingState.LOADED,
			});
		}
		case RoomActionTypes.getRoomError: {
			return { ...state, callState: action.payload };
		}
		case RoomListActionsTypes.upsertRoomListSuccess: {
			const room = action.payload.roomList.rooms.find(
				(room) => state.baseRoom.id === room.id,
			);
			return roomAdapter.addAll(room.hardwares, {
				...state,
				activeHardware: room.activeHardware,
				baseRoom: Room.getBase(room),
				callState: LoadingState.LOADED,
			});
		}
		case RoomListActionsTypes.upsertRoomListWhenLeft: {
			return initialRoomState;
		}

		case RoomActionTypes.updateOneHardwareSuccess: {
			return roomAdapter.upsertOne(action.payload.hardware, state);
		}
		default:
			return state;
	}
}
