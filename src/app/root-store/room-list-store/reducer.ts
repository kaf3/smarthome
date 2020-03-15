import {initialRoomListState, RoomListState, roomsAdapter } from './state'
import { roomsUnion, roomsActions } from './actions';


export function roomsReducer(state = initialRoomListState, action: roomsUnion): RoomListState {
    switch (action.type) {
        case roomsActions.loadRoomsSucces: {
           return roomsAdapter.addAll(action.payload.rooms, state);
        }
        case roomsActions.loadRoomsError: {
            return roomsAdapter.removeAll(state);
        }
        default: return state;
    }
}

