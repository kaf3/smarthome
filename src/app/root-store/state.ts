import {initialRoomListState} from './room-list-store/state';
import {RouterReducerState} from '@ngrx/router-store';
import {RoomListStoreState} from './room-list-store';
import {RoomStoreState} from './room-store';
import {initialRoomState} from './room-store/state';

export interface AppState {
  RoomListState: RoomListStoreState.RoomListState;
  RoomState: RoomStoreState.RoomState;
  router?: RouterReducerState;
}

export const initialAppState: AppState = { //что делать с начальным состоянием
  RoomListState: initialRoomListState,
  RoomState: initialRoomState
}
