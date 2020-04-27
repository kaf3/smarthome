import {initialRoomListState, RoomListState, roomsAdapter} from './state';
import {RoomsActions, roomsUnion} from './actions';

export function roomsReducer(
    state = initialRoomListState,
    action: roomsUnion,
): RoomListState {
    switch (action.type) {
        case RoomsActions.loadRoomsSuccess: {
            return roomsAdapter.addAll(action.payload.rooms, state);
        }
        case RoomsActions.loadRoomsError: {
            return roomsAdapter.removeAll(state);
        }
        case RoomsActions.updateRoomsSuccess: {
            return roomsAdapter.updateOne(action.payload.update, state);
        }
        case RoomsActions.updateRoomsError: {
            return roomsAdapter.removeAll(state);
        }
        default:
            return state;
    }
}
