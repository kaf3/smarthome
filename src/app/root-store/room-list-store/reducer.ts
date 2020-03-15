import {initialRoomListState, RoomListState, roomsAdapter, RoomsAndRoomState} from './state'
import { roomsUnion, roomsActions } from './actions';
import { roomReducer } from '../../room-list/store/reducers/room.reducer';
import { ActionReducerMap} from '@ngrx/store';


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


export const roomsAndRoomReducer: ActionReducerMap<RoomsAndRoomState, any> = {
    roomState: roomReducer,
    roomListState: roomsReducer
}

