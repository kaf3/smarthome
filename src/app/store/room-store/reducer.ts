import {RoomActions, RoomUnion} from './actions';
import {initialRoomState, roomAdapter, RoomState} from './state';
import {RoomsActions, RoomsUnion} from '../room-list-store/actions';

export function roomReducer(
    state = initialRoomState,
    action: RoomUnion | RoomsUnion,
): RoomState {
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
        case RoomsActions.upsertAllRoomsSuccess: {
            const room = action.payload.rooms.find(
                room => state.roomName === room.roomName,
            );

            return roomAdapter.addAll(room.equipment, {
                ...state,
            });
        }
        default:
            return state;
    }
}
