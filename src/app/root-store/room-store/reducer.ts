import {RoomActions, RoomUnion} from './actions';
import {initialRoomState, roomAdapter, RoomState} from './state';

export function roomReducer(state = initialRoomState, action: RoomUnion): RoomState {
    switch (action.type) {
        case RoomActions.getRoomSuccess: {
            const {roomName} = action.payload.room;

            return roomAdapter.addAll(action.payload.room.equipment, {
                ...state,
                roomName,
            });
        }
        case RoomActions.getRoomError: {
            return state;
        }
        default:
            return state;
    }
}
