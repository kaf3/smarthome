import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Room } from '@models/room';
import { RoomList } from '@models/room-list';
import { ROOMLIST_FEATURE_KEY, RoomListState, roomsAdapter } from './reducer';

export const selectRoomListState = createFeatureSelector<RoomListState>(ROOMLIST_FEATURE_KEY);

export const {
	selectAll: selectRooms,
	selectEntities: selectRoomListEntities,
} = roomsAdapter.getSelectors(selectRoomListState);

export const selectRoomById = createSelector(
	selectRoomListEntities,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	(roomEntities: Dictionary<Room>, id: Room['id']) => roomEntities[id ?? '']!,
);

export const selectCallState = createSelector(selectRoomListState, (state) => state.callState);

export const selectRoomList = createSelector(
	selectRoomListState,
	selectRooms,
	(state, rooms) => new RoomList({ activeRoom: state.activeRoom, rooms }),
);
