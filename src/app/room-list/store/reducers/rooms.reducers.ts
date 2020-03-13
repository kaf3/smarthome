import {initialRoomsState, RoomsState, roomsAdapter, RoomsAndRoomState} from '../state/rooms.state'
import { roomsUnion, roomsActions } from '../actions/rooms.action';
import { roomReducer } from './room.reducer';
import { ActionReducerMap} from '@ngrx/store';


export function roomsReducer(state = initialRoomsState, action: roomsUnion) : RoomsState {
    switch(action.type) {

        case roomsActions.loadRoomsSucces: {
           return roomsAdapter.addAll(action.payload.rooms, state)
        }
        
        case roomsActions.loadRoomsError: {
            return roomsAdapter.removeAll(state)
        }

        default: 
            return state;
    }
}


export const roomsAndRoomReducer: ActionReducerMap<RoomsAndRoomState, any> = {
    roomState: roomReducer,
    roomsState: roomsReducer
}

