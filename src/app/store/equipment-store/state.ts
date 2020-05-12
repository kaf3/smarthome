import { Equipment } from 'src/app/models/equipment';
import { CallState, LoadingState } from '@models';
import { FeatureKey } from '../state';

export const EQUIPMENT_FEATURE_KEY: FeatureKey = 'equipment';

export interface EquipmentPartialState {
	readonly [EQUIPMENT_FEATURE_KEY]: EquipmentState;
}

export interface EquipmentState {
	equipment: Equipment;
	callState: CallState;
}

export const initialEquipment: Equipment = {
	name: '',
	value: false,
	type: null,
	group: null,
	id: '',
	location: '',
	working: false,
	frequencyUpdating: [],
};

export const initialEquipmentState: EquipmentState = {
	equipment: initialEquipment,
	callState: LoadingState.INIT,
};
