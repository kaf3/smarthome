import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FeatureKey } from '../state';
import { CallState, LoadingState } from '@models/error-loading';
import { BaseRoom } from '@models/room';
import { Hardware } from '@models/hardware';

export const ROOM_FEATURE_KEY: FeatureKey = 'room';

export interface RoomPartialState {
	readonly [ROOM_FEATURE_KEY]: RoomState;
}

export interface RoomState extends EntityState<Hardware> {
	baseRoom: BaseRoom;
	callState: CallState;
	activeHardware: Hardware;
}

export const roomAdapter: EntityAdapter<Hardware> = createEntityAdapter<Hardware>({
	selectId: (hardware: Hardware) => hardware.id,
	sortComparer: false,
});

export const initialRoomState: RoomState = roomAdapter.getInitialState({
	baseRoom: BaseRoom.initial,
	callState: LoadingState.INIT,
	activeHardware: Hardware.initial,
});
