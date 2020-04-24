import {RoomActions, RoomUnion} from './actions';
import {initialRoomState, RoomState} from './state';

export function roomReducer(state = initialRoomState, action: RoomUnion): RoomState {
    switch (action.type) {
        case RoomActions.getRoomSuccess: {
            const {room} = action.payload;

            return {...state, room};
        }
        case RoomActions.getRoomError: {
            return state;
        }
        default:
            return state;
    }
}
