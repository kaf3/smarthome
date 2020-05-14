import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CallState, initialRoom, LoadingState, Room } from '@models';
import { FeatureKey } from '../state';

export const ROOMLIST_FEATURE_KEY: FeatureKey = 'roomList';

export interface RoomListPartialState {
	readonly [ROOMLIST_FEATURE_KEY]: RoomListState;
}

export interface RoomListState extends EntityState<Room> {
	callState: CallState;
	activeRoom: Room;
}

export const roomsAdapter: EntityAdapter<Room> = createEntityAdapter<Room>({
	selectId: (room: Room) => room.id,
	sortComparer: false,
});

export const initialRoomListState: RoomListState = roomsAdapter.getInitialState({
	callState: LoadingState.INIT,
	activeRoom: initialRoom,
});
