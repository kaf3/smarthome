import { initialRoomListState, RoomListState, roomsAdapter } from './state';
import { RoomListActionsTypes, RoomsUnion } from './actions';
import { LoadingState } from '@models/error-loading';

export function roomsReducer(state = initialRoomListState, action: RoomsUnion): RoomListState {
	switch (action.type) {
		case RoomListActionsTypes.loadRoomList:
		case RoomListActionsTypes.upsertAllRooms: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomListActionsTypes.loadRoomListSuccess: {
			const { rooms, activeRoom } = action.payload.roomList;
			return roomsAdapter.addAll(rooms, {
				...state,
				activeRoom,
				callState: LoadingState.LOADED,
			});
		}
		case RoomListActionsTypes.upsertAllRoomsSuccess: {
			return roomsAdapter.addAll(action.payload.rooms, {
				...state,
				callState: LoadingState.LOADED,
			});
		}
		case RoomListActionsTypes.loadRoomListError:
		case RoomListActionsTypes.upsertAllRoomsError: {
			const { errorMsg } = action.payload;

			return { ...state, callState: { errorMsg } };
		}
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
