import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROOMLIST_FEATURE_KEY, RoomListState, roomsAdapter } from './state';
import { Dictionary } from '@ngrx/entity';
import { Room } from '@models';
import { getError, isLoaded, isLoading } from '@helpers';
import { AppState } from '../state';

export const selectRoomListState = createFeatureSelector<AppState, RoomListState>(
	ROOMLIST_FEATURE_KEY,
);

export const selectRooms = roomsAdapter.getSelectors(selectRoomListState).selectAll;
export const selectRoomListEntities = roomsAdapter.getSelectors(selectRoomListState).selectEntities;

export const selectRoomById = createSelector(
	selectRoomListEntities,
	(roomEntities: Dictionary<Room>, id: Room['id']) => roomEntities[id],
);

export const selectCallState = createSelector(selectRoomListState, (state) => state.callState);

export const selectLoading = createSelector(selectRoomListState, isLoading);

export const selectLoaded = createSelector(selectRoomListState, isLoaded);

export const selectError = createSelector(selectRoomListState, getError);
