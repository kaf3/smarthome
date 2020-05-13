import { CallState, Equipment, initialEquipment, LoadingState } from '@models';
import { FeatureKey } from '../state';

export const EQUIPMENT_FEATURE_KEY: FeatureKey = 'equipment';

export interface EquipmentPartialState {
	readonly [EQUIPMENT_FEATURE_KEY]: EquipmentState;
}

export interface EquipmentState {
	equipment: Equipment;
	callState: CallState;
}

export const initialEquipmentState: EquipmentState = {
	equipment: initialEquipment,
	callState: LoadingState.INIT,
};
