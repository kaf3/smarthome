import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Room } from '@models/room';
import { Hardware } from '@models/hardware';
import { Equipment } from '@models/equipment';
import { ROOMLIST_FEATURE_KEY, RoomListState } from './reducer';
import { RoomList } from '@models/room-list';
import { selectRouteParam } from '../selectors';

export const selectRoomListState = createFeatureSelector<RoomListState>(ROOMLIST_FEATURE_KEY);

export const selectRoomList = createSelector(selectRoomListState, (state) => state.roomList);

export const selectRoomEntityState = createSelector(
	selectRoomList,
	(roomList) => roomList.roomEntityState,
);

export const {
	selectAll: selectRooms,
	selectEntities: selectRoomListEntities,
	selectIds,
} = RoomList.adapter.getSelectors(selectRoomEntityState);

export const selectRoomById = createSelector(
	selectRoomListEntities,
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	(roomEntities: Dictionary<Room>, id: Room['id']) => roomEntities[id ?? '']!,
);

export const selectCallState = createSelector(selectRoomListState, (state) => state.callState);

export const selectHardwareById = createSelector(
	selectRoomListEntities,
	(roomEntities: Dictionary<Room>, { roomId, hardwareId }) =>
		selectRoomById.projector(roomEntities, roomId).hardwareEntityState.entities[hardwareId] ??
		Hardware.initial,
);

export const selectEquipmentById = createSelector(
	selectRoomListEntities,
	(roomEntities, { roomId, hardwareId, equipmentId }) =>
		selectHardwareById.projector(roomEntities, { roomId, hardwareId }).equipmentEntityState
			.entities[equipmentId] ?? Equipment.initial,
);

export const selectRoom = createSelector(
	selectRoomListEntities,
	selectRouteParam('id'),
	(roomEntities: Dictionary<Room>, id: Room['id']) => {
		return id === undefined ? Room.initial : roomEntities?.[id ?? ''];
	},
);

export const selectHardware = createSelector(
	selectRoom,
	selectRouteParam('hardwareId'),
	(room: Room, hardwareId: Hardware['id']) =>
		hardwareId === undefined
			? Hardware.initial
			: room?.hardwareEntityState?.entities?.[hardwareId ?? ''],
);
