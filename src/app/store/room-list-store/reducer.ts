import { initialRoomListState, RoomListState, roomsAdapter } from './state';
import { RoomsActions, RoomsUnion } from './actions';
import { LoadingState } from '@models';

export function roomsReducer(state = initialRoomListState, action: RoomsUnion): RoomListState {
	switch (action.type) {
		case RoomsActions.loadRooms:
		case RoomsActions.upsertAllRooms: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomsActions.loadRoomsSuccess:
		case RoomsActions.upsertAllRoomsSuccess: {
			return roomsAdapter.addAll(action.payload.rooms, {
				...state,
				callState: LoadingState.LOADED,
			});
		}
		case RoomsActions.loadRoomsError:
		case RoomsActions.upsertAllRoomsError: {
			const { errorMsg } = action.payload;

			return { ...state, callState: { errorMsg } };
		}

		default:
			return state;
	}
}
