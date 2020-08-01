import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Hardware } from '@models/hardware';
import { ROOM_FEATURE_KEY, RoomState } from './reducer';
import { Room } from '@models/room';

export const selectRoomState = createFeatureSelector<RoomState>(ROOM_FEATURE_KEY);

export const selectRoom = createSelector(selectRoomState, (state) => state.room);

export const selectEntityState = createSelector(selectRoom, (r) => r.hardwareEntityState);

export const { selectIds, selectEntities, selectAll, selectTotal } = Room.adapter.getSelectors(
	selectEntityState,
);

export const selectById = createSelector(
	selectEntities,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	(hardwareCollection: Dictionary<Hardware>, id: string) => hardwareCollection[id ?? '']!,
);

export const selectCallState = createSelector(selectRoomState, (state) => state.callState);
