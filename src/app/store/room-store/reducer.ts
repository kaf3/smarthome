import { RoomActionTypes, RoomUnion } from './actions';
import { initialRoomState, roomAdapter, RoomState } from './state';
import { RoomsActions, RoomsUnion } from '../room-list-store/actions';
import { LoadingState } from '@models';

export function roomReducer(state = initialRoomState, action: RoomUnion | RoomsUnion): RoomState {
	switch (action.type) {
		case RoomActionTypes.getRoom:
		case RoomsActions.upsertAllRooms: {
			return { ...state, callState: LoadingState.LOADING };
		}
		case RoomActionTypes.getRoomSuccess: {
			const { roomName } = action.payload.room;

			return roomAdapter.addAll(action.payload.room.equipment, {
				...state,
				roomName,
				callState: LoadingState.LOADED,
			});
		}
		case RoomActionTypes.getRoomError: {
			const { errorMsg } = action.payload;

			return { ...state, callState: { errorMsg } };
		}
		case RoomsActions.upsertAllRoomsSuccess: {
			const room = action.payload.rooms.find((room) => state.roomName === room.roomName);

			return roomAdapter.addAll(room.equipment, {
				...state,
				callState: LoadingState.LOADED,
			});
		}
		case RoomActionTypes.upsertRoomSuccess: {
			const { roomName, equipment } = action.payload.room;
			const { activeEquipment } = action.payload;

			return roomAdapter.addAll(equipment, {
				...state,
				roomName,
				activeEquipment,
				callState: LoadingState.LOADED,
			});
		}
		default:
			return state;
	}
}
