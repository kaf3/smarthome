import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Hardware } from '@models/hardware';
import { Room } from '@models/room';
import { ROOM_FEATURE_KEY, roomAdapter, RoomState } from './reducer';

export const selectRoomState = createFeatureSelector<RoomState>(ROOM_FEATURE_KEY);

export const { selectIds, selectEntities, selectAll, selectTotal } = roomAdapter.getSelectors(
	selectRoomState,
);

export const selectById = createSelector(
	selectEntities,
	(hardwareCollection: Dictionary<Hardware>, id: string) => hardwareCollection[id],
);

export const selectCallState = createSelector(selectRoomState, (state) => state.callState);

export const selectRoom = createSelector(
	selectRoomState,
	selectAll,
	(state, hardwares) =>
		new Room({ ...state.baseRoom, activeHardware: state.activeHardware, hardwares }),
);
