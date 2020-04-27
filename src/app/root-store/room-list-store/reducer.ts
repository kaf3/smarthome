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
        case RoomsActions.upsertOneRoomSuccess: {
            return roomsAdapter.upsertOne(action.payload.room, state);
        }
        case RoomsActions.upsertOneRoomError: {
            return roomsAdapter.removeAll(state);
        }
        default:
            return state;
    }
}
