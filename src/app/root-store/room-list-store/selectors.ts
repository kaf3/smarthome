import {createFeatureSelector} from '@ngrx/store';
import {RoomListState, roomsAdapter} from './state';

const selectRoomListState = createFeatureSelector<RoomListState>('room-list');

export const selectRoomList = roomsAdapter.getSelectors(selectRoomListState).selectAll;
