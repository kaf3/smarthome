import {initialRoomListState, RoomListState, roomsAdapter} from './state';
import {RoomsActions, RoomsUnion} from './actions';

export function roomsReducer(
    state = initialRoomListState,
    action: RoomsUnion,
): RoomListState {
    switch (action.type) {
        case RoomsActions.loadRoomsSuccess:
        case RoomsActions.upsertAllRoomsSuccess: {
            return roomsAdapter.addAll(action.payload.rooms, state);
        }
        case RoomsActions.loadRoomsError:
        case RoomsActions.upsertAllRoomsError: {
            return roomsAdapter.removeAll(state);
        }

        default:
            return state;
    }
}
