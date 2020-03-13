import { createFeatureSelector, createSelector } from '@ngrx/store';
import { roomsAdapter, RoomsAndRoomState } from '../state/rooms.state';

export const selectRoomsAndRoomState = /* (state: AppState) => state.roomsState;  */ createFeatureSelector<RoomsAndRoomState>('room-list');
const selectRoomsState = createSelector(selectRoomsAndRoomState, state => state.roomsState);

export const selectRooms = roomsAdapter.getSelectors(selectRoomsState).selectAll