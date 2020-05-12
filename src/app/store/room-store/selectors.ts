import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROOM_FEATURE_KEY, roomAdapter, RoomState } from './state';
import { Dictionary } from '@ngrx/entity';
import { Equipment } from '@models';
import { getError, isInit, isLoaded, isLoading } from '@helpers';
import { AppState } from '../state';

const selectRoomState = createFeatureSelector<AppState, RoomState>(ROOM_FEATURE_KEY);

const { selectIds, selectEntities, selectAll, selectTotal } = roomAdapter.getSelectors(
	selectRoomState,
);

export const selectEquipmentIdsFromRoom = selectIds;
export const selectEquipmentEntitiesFromRoom = selectEntities;
export const selectAllEquipmentFromRoom = selectAll;
export const selectTotalEquipmentFromRoom = selectTotal;

export const selectEquipmentByIdFromRoom = createSelector(
	selectEquipmentEntitiesFromRoom,
	(equipmentDict: Dictionary<Equipment>, id: string) => equipmentDict[id],
);

export const selectCallState = createSelector(selectRoomState, (state) => state.callState);

export const selectRoomName = createSelector(selectRoomState, (state) => state.roomName);

export const selectLoading = createSelector(selectRoomState, isLoading);

export const selectLoaded = createSelector(selectRoomState, isLoaded);

export const selectInit = createSelector(selectRoomState, isInit);

export const selectError = createSelector(selectRoomState, getError);

export const selectActiveEquipment = createSelector(
	selectRoomState,
	(state) => state.activeEquipment,
);
