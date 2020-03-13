
import { RoomUnion, roomActions } from '../actions/room.actions';
import { initialRoomState, RoomState } from '../state/room.state';


export function roomReducer(state = initialRoomState, action: RoomUnion): RoomState {
    switch(action.type) {
        case roomActions.getRoomSucces: {
            const room = action.payload.room
            return {...state, room}
        }
        case roomActions.getRoomError: {
            return state;
        }
        default:
            return state;
    }
}