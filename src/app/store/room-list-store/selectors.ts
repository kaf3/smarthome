import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROOMLIST_FEATURE_KEY, RoomListState, roomsAdapter } from './state';
import { Dictionary } from '@ngrx/entity';
import { Room } from '@models/room';
import { AppState } from '../state';
import { RoomList } from '@models/rooms';

export const selectRoomListState = createFeatureSelector<AppState, RoomListState>(
	ROOMLIST_FEATURE_KEY,
);

export const {
	selectAll: selectRooms,
	selectEntities: selectRoomListEntities,
} = roomsAdapter.getSelectors(selectRoomListState);

export const selectRoomById = createSelector(
	selectRoomListEntities,
	(roomEntities: Dictionary<Room>, id: Room['id']) => roomEntities[id], // && new Room({ ...roomEntities[id] }),
);

export const selectCallState = createSelector(selectRoomListState, (state) => state.callState);

export const selectRoomList = createSelector(
	selectRoomListState,
	selectRooms,
	(state, rooms) => new RoomList({ activeRoom: state.activeRoom, rooms }),
);
