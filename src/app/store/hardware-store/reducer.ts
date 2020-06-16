import { HardwareActions, HardwareActionTypes } from './actions';
import { BaseHardware, Hardware } from '@models/hardware';
import { CallState, LoadingState } from '@models/error-loading';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Equipment } from '@models/equipment';
import { RoomListStoreActions } from '@store/room-list';
import { RoomStoreActions } from '@store/room';
import { RoomActionTypes } from '../room-store/actions';
import { RoomListActionsTypes } from '../room-list-store/actions';

export const hardwareFeatureKey = 'hardware';

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
	action: HardwareActions | RoomListStoreActions.RoomListActions | RoomStoreActions.RoomActions,
): HardwareState {
	switch (action.type) {
		case HardwareActionTypes.LoadHardware:
			return { ...state, callState: LoadingState.LOADING };

		case HardwareActionTypes.LoadHardwareSuccess:
		case RoomActionTypes.updateOneHardwareSuccess: {
			const { activeEquipment, equipments } = action.payload.hardware;
			return hardwareAdapter.addAll(equipments, {
				...state,
				activeEquipment,
				baseHardware: Hardware.getBase(action.payload.hardware),
				callState: LoadingState.LOADED,
			});
		}
		case HardwareActionTypes.LoadHardwareFailure:
		case RoomActionTypes.updateOneHardwareFailure:
			return { ...state, callState: action.payload };

		case RoomListStoreActions.RoomListActionsTypes.upsertRoomWhenLeft: {
			return initialState;
		}
		case RoomListActionsTypes.moveHardwareSuccess:
			return initialState;

		case HardwareActionTypes.UpdateOneEquipmentSuccess: {
			return hardwareAdapter.upsertOne(action.payload.equipment, {
				...state,
				callState: LoadingState.LOADED,
			});
		}

		case HardwareActionTypes.UpdateOneEquipmentFailure: {
			return { ...state, callState: action.payload };
		}
		default:
			return state;
	}
}
