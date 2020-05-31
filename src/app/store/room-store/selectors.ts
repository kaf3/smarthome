import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROOM_FEATURE_KEY, roomAdapter, RoomState } from './state';
import { Dictionary } from '@ngrx/entity';
import { AppState } from '../state';
import { Hardware } from '@models/hardware';
import { Room } from '@models/room';

export const selectRoomState = createFeatureSelector<AppState, RoomState>(ROOM_FEATURE_KEY);

export const { selectIds, selectEntities, selectAll, selectTotal } = roomAdapter.getSelectors(
	selectRoomState,
);

export const selectById = createSelector(
	selectEntities,
	(hardwareCollection: Dictionary<Hardware>, id: string) =>
		!!hardwareCollection[id] && new Hardware({ ...hardwareCollection[id] }),
);

export const selectCallState = createSelector(selectRoomState, (state) => state.callState);

export const selectName = createSelector(selectRoomState, (state) => state.baseRoom.name);

export const selectRoom = createSelector(
	selectRoomState,
	selectAll,
	(state, hardwares) =>
		new Room({ ...state.baseRoom, activeHardware: state.activeHardware, hardwares }),
);
