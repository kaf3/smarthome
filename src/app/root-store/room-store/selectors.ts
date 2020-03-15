import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RoomState} from './state';

const selectRoomState = createFeatureSelector<RoomState>('room');

export const selectRoom = createSelector(selectRoomState, (roomState: RoomState) => roomState.room);
