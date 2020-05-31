import { RoomActionTypes, RoomUnion } from './actions';
import { initialRoomState, roomAdapter, RoomState } from './state';
import { RoomListActionsTypes, RoomsUnion } from '../room-list-store/actions';
import { LoadingState } from '@models/error-loading';

export function roomReducer(state = initialRoomState, action: RoomUnion | RoomsUnion): RoomState {
	switch (action.type) {
		case RoomActionTypes.getRoom:
		case RoomListActionsTypes.upsertAllRooms: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomActionTypes.getRoomSuccess: {
			const { hardwares, activeHardware } = action.payload.room;
			return roomAdapter.addAll(hardwares, {
				...state,
				baseRoom: action.payload.room.getBase(),
				activeHardware,
				callState: LoadingState.LOADED,
			});
		}
		case RoomActionTypes.getRoomError: {
			return { ...state, callState: action.payload };
		}
		case RoomListActionsTypes.upsertAllRoomsSuccess: {
			const room = action.payload.rooms.find((room) => state.baseRoom.id === room.id);
			return roomAdapter.addAll(room.hardwares, {
				...state,
				activeHardware: room.activeHardware,
				baseRoom: room.getBase(),
				callState: LoadingState.LOADED,
			});
		}
		case RoomListActionsTypes.upsertRoomListWhenLeft: {
			return initialRoomState;
		}
		default:
			return state;
	}
}
