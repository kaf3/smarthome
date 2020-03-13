
import { RouterReducerState } from '@ngrx/router-store';
import { RoomsAndRoomState, roomsAndRoomInitialState } from '../../room-list/store/state/rooms.state';
import { AppRoute } from '../../router/app-router';


export interface AppState {
    roomsAndRoomState: RoomsAndRoomState // не оч понятно 
    router?: RouterReducerState<AppRoute> 
}

export const initialAppState: AppState = { //что делать с начальным состоянием
    roomsAndRoomState: roomsAndRoomInitialState,
}

