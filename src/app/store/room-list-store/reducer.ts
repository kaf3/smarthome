import { initialRoomListState, RoomListState, roomsAdapter } from './state';
import { RoomListActionsTypes, RoomsUnion } from './actions';
import { LoadingState } from '@models/error-loading';

export function roomsReducer(state = initialRoomListState, action: RoomsUnion): RoomListState {
	switch (action.type) {
		case RoomListActionsTypes.loadRoomList:
		case RoomListActionsTypes.upsertRoomList: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomListActionsTypes.loadRoomListSuccess:
		case RoomListActionsTypes.upsertRoomListSuccess: {
			const { rooms, activeRoom } = action.payload.roomList;
			return roomsAdapter.addAll(rooms, {
				...state,
				activeRoom,
				callState: LoadingState.LOADED,
			});
		}

		case RoomListActionsTypes.loadRoomListError:
		case RoomListActionsTypes.upsertRoomListError: {
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
