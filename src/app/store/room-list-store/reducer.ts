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
		case RoomsActionsTypes.upsertRoom: {
			return roomsAdapter.upsertOne(action.payload.room, state);
		}

		default:
			return state;
	}
}
