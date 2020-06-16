import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EQUIPMENT_FEATURE_KEY, EquipmentState } from './reducer';

const selectEquipmentState = createFeatureSelector<EquipmentState>(EQUIPMENT_FEATURE_KEY);

export const selectEquipment = createSelector(
	selectEquipmentState,
	(equipmentState: EquipmentState) => equipmentState.equipment,
);

export const selectCallState = createSelector(selectEquipmentState, (state) => state.callState);
