import { FeatureKey } from '../state';
import { Equipment } from '@models/equipment';
import { CallState, LoadingState } from '@models/error-loading';

export const EQUIPMENT_FEATURE_KEY: FeatureKey = 'equipment';

export interface EquipmentPartialState {
	readonly [EQUIPMENT_FEATURE_KEY]: EquipmentState;
}

export interface EquipmentState {
	equipment: Equipment;
	callState: CallState;
}

export const initialEquipmentState: EquipmentState = {
	equipment: Equipment.initial,
	callState: LoadingState.INIT,
};
