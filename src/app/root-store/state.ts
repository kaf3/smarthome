import {roomsAndRoomInitialState, RoomsAndRoomState, RoomListState, initialRoomListState} from './room-list-store/state';
import {RouterReducerState} from '@ngrx/router-store';
import {RoomListStoreState} from './room-list-store';

export interface AppState {
  RoomListState: RoomListStoreState.RoomListState;
  router?: RouterReducerState;
}

export const initialAppState: AppState = { //что делать с начальным состоянием
  RoomListState: initialRoomListState
}
