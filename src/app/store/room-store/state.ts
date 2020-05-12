import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CallState, Equipment, LoadingState } from '@models';
import { initialEquipment } from '../equipment-store/state';
import { FeatureKey } from '../state';

export const ROOM_FEATURE_KEY: FeatureKey = 'room';

export interface RoomPartialState {
	readonly [ROOM_FEATURE_KEY]: RoomState;
}

export interface RoomState extends EntityState<Equipment> {
	roomName: string;
	callState: CallState;
	activeEquipment: Equipment;
}

export const roomAdapter: EntityAdapter<Equipment> = createEntityAdapter<Equipment>({
	selectId: (equipment: Equipment) => equipment.id,
	sortComparer: false,
});

export const initialRoomState: RoomState = roomAdapter.getInitialState({
	roomName: '',
	callState: LoadingState.INIT,
	activeEquipment: initialEquipment,
});
