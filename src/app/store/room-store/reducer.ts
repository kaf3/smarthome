import { RoomActionTypes, RoomUnion } from './actions';
import { initialRoomState, roomAdapter, RoomState } from './state';
import { RoomsActionsTypes, RoomsUnion } from '../room-list-store/actions';
import { LoadingState } from '@models';

export function roomReducer(state = initialRoomState, action: RoomUnion | RoomsUnion): RoomState {
	switch (action.type) {
		case RoomActionTypes.getRoom:
		case RoomsActionsTypes.upsertAllRooms: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomActionTypes.getRoomSuccess: {
			const { roomName, equipment, activeEquipment, id } = action.payload.room;

			return roomAdapter.addAll(equipment, {
				...state,
				id,
				roomName,
				activeEquipment,
				callState: LoadingState.LOADED,
			});
		}
		case RoomActionTypes.getRoomError: {
			const { errorMsg } = action.payload;

			return { ...state, callState: { errorMsg } };
		}
		case RoomsActionsTypes.upsertAllRoomsSuccess: {
			const { equipment, activeEquipment, roomName, id } = action.payload.rooms.find(
				(room) => state.id === room.id,
			);

			return roomAdapter.addAll(equipment, {
				...state,
				id,
				activeEquipment,
				roomName,
				callState: LoadingState.LOADED,
			});
		}
		default:
			return state;
	}
}
