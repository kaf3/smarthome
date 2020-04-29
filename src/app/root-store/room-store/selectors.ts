import {createFeatureSelector, createSelector} from '@ngrx/store';
import {roomAdapter, RoomState} from './state';
import {Dictionary} from '@ngrx/entity';
import {Equipment} from '@models';

const selectRoomState = createFeatureSelector<RoomState>('room');

const {selectIds, selectEntities, selectAll, selectTotal} = roomAdapter.getSelectors(
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

export const selectRoomName = createSelector(
    selectRoomState,
    state => state.roomName,
);
