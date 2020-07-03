import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Room } from '@models/room';
import { RoomList } from '@models/room-list';
import { ROOMLIST_FEATURE_KEY, RoomListState, roomsAdapter } from './reducer';
import { Hardware } from '@models/hardware';
import { Equipment } from '@models/equipment';

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

export const selectHardwareById = createSelector(
	selectRoomListEntities,
	(roomEntities: Dictionary<Room>, { roomId, hardwareId }) =>
		selectRoomById
			.projector(roomEntities, roomId)
			.hardwares.find((hrd) => hrd.id === hardwareId) ?? Hardware.initial,
);

export const selectEquipmentById = createSelector(
	selectRoomListEntities,
	(roomEntities, { roomId, hardwareId, equipmentId }) =>
		selectHardwareById
			.projector(roomEntities, { roomId, hardwareId })
			.equipments.find((eqp) => eqp.id === equipmentId) ?? Equipment.initial,
);
