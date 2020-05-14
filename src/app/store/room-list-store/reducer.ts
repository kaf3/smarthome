import { initialRoomListState, RoomListState, roomsAdapter } from './state';
import { RoomsActionsTypes, RoomsUnion } from './actions';
import { LoadingState } from '@models';

export function roomsReducer(state = initialRoomListState, action: RoomsUnion): RoomListState {
	switch (action.type) {
		case RoomsActionsTypes.loadRooms:
		case RoomsActionsTypes.upsertAllRooms: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomsActionsTypes.loadRoomsSuccess:
		case RoomsActionsTypes.upsertAllRoomsSuccess: {
			return roomsAdapter.addAll(action.payload.rooms, {
				...state,
				callState: LoadingState.LOADED,
			});
		}
		case RoomsActionsTypes.loadRoomsError:
		case RoomsActionsTypes.upsertAllRoomsError: {
			const { errorMsg } = action.payload;

			return { ...state, callState: { errorMsg } };
		}
		case RoomsActionsTypes.upsertRoom:
		case RoomsActionsTypes.upsertRoomWhenLeft: {
			return roomsAdapter.upsertOne(action.payload.room, state);
		}

		case RoomsActionsTypes.upsertRoomListWhenLeft: {
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
