import { RouterReducerState } from '@ngrx/router-store';
import { RoomListStoreState } from './room-list-store';
import { RoomStoreState } from './room-store';
import { EquipmentStoreState } from './equipment-store';
import { EquipmentFormStoreState } from './equipment-form-store';
import { HardwareStoreState } from './hardware-store';
import { HardwareFormStoreState } from './hardware-form-store';

export type FeatureKey = keyof AppState;

export const ROUTER_FEATURE_KEY: FeatureKey = 'router';

export interface AppState {
	roomList: RoomListStoreState.RoomListState;
	room: RoomStoreState.RoomState;
	equipment: EquipmentStoreState.EquipmentState;
	equipmentForm: EquipmentFormStoreState.EquipmentFormState;
	hardware: HardwareStoreState.HardwareState;
	hardwareForm: HardwareFormStoreState.HardwareFormState;
	router?: RouterReducerState;
}

export const initialAppState: AppState = {
	roomList: RoomListStoreState.initialRoomListState,
	room: RoomStoreState.initialRoomState,
	equipment: EquipmentStoreState.initialEquipmentState,
	equipmentForm: EquipmentFormStoreState.initialEquipmentFormState,
	hardware: HardwareStoreState.initialState,
	hardwareForm: HardwareFormStoreState.initialHardwareFormState,
};
