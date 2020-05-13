import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CallState, Equipment, initialEquipment, LoadingState, Room } from '@models';
import { FeatureKey } from '../state';

export const ROOM_FEATURE_KEY: FeatureKey = 'room';

export interface RoomPartialState {
	readonly [ROOM_FEATURE_KEY]: RoomState;
}

export interface RoomState extends EntityState<Equipment> {
	id: Room['id'];
	roomName: Room['roomName'];
	callState: CallState;
	activeEquipment: Room['activeEquipment'];
}

export const roomAdapter: EntityAdapter<Equipment> = createEntityAdapter<Equipment>({
	selectId: (equipment: Equipment) => equipment.id,
	sortComparer: false,
});

export const initialRoomState: RoomState = roomAdapter.getInitialState({
	id: -1,
	roomName: '',
	callState: LoadingState.INIT,
	activeEquipment: initialEquipment,
});
