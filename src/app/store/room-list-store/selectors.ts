import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RoomListState, roomsAdapter} from './state';
import {Dictionary} from '@ngrx/entity';
import {Room} from '@models';
import {getError, isLoaded, isLoading} from '@helpers';

const selectRoomListState = createFeatureSelector<RoomListState>('room-list');

export const selectRoomList = roomsAdapter.getSelectors(selectRoomListState).selectAll;
export const selectRoomListEntities = roomsAdapter.getSelectors(selectRoomListState)
    .selectEntities;

export const selectRoomByName = createSelector(
    selectRoomListEntities,
    (roomEntities: Dictionary<Room>, name: string) => roomEntities[name],
);

export const selectLoading = createSelector(
    selectRoomListState,
    isLoading,
);

export const selectLoaded = createSelector(
    selectRoomListState,
    isLoaded,
);

export const selectError = createSelector(
    selectRoomListState,
    getError,
);
