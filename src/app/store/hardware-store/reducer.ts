import { HardwareActions, HardwareActionTypes } from './actions';
import { BaseHardware, Hardware } from '@models/hardware';
import { CallState, LoadingState } from '@models/error-loading';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Equipment } from '@models/equipment';
import { FeatureKey } from '../state';
import { RoomListStoreActions } from '@store/room-list';

export const hardwareFeatureKey: FeatureKey = 'hardware';

export interface HardwareState extends EntityState<Equipment> {
	baseHardware: BaseHardware;
	activeEquipment: Hardware['activeEquipment'];
	callState: CallState;
}

export const hardwareAdapter: EntityAdapter<Equipment> = createEntityAdapter<Equipment>({
	selectId: (equipment: Equipment) => equipment.id,
	sortComparer: false,
});

export const initialState: HardwareState = hardwareAdapter.getInitialState({
	baseHardware: BaseHardware.initial,
	activeEquipment: Equipment.initial,
	callState: LoadingState.INIT,
});

export function reducer(
	state = initialState,
	action: HardwareActions | RoomListStoreActions.RoomsUnion,
): HardwareState {
	switch (action.type) {
		case HardwareActionTypes.LoadHardware:
			return { ...state, callState: LoadingState.LOADING };

		case HardwareActionTypes.LoadHardwareSuccess: {
			const { activeEquipment, equipments } = action.payload.hardware;
			return hardwareAdapter.addAll(equipments, {
				...state,
				activeEquipment,
				baseHardware: action.payload.hardware.getBase(),
				callState: LoadingState.LOADED,
			});
		}
		case HardwareActionTypes.LoadHardwareFailure:
			return { ...state, callState: action.payload };

		case RoomListStoreActions.RoomListActionsTypes.upsertRoomWhenLeft: {
			return initialState;
		}

		default:
			return state;
	}
}
