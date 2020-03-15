import { createFeatureSelector, createSelector } from '@ngrx/store';
import {RoomListState, roomsAdapter, RoomsAndRoomState} from './state';

export const selectRoomListState = createFeatureSelector<RoomListState>('room-list');

export const selectRoomList = roomsAdapter.getSelectors(selectRoomListState).selectAll
