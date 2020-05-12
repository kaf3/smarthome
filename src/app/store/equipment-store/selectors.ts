import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EQUIPMENT_FEATURE_KEY, EquipmentState } from './state';
import { AppState } from '../state';

const selectEquipmentState = createFeatureSelector<AppState, EquipmentState>(EQUIPMENT_FEATURE_KEY);

export const selectEquipment = createSelector(
	selectEquipmentState,
	(equipmentState: EquipmentState) => equipmentState.equipment,
);

export const selectCallState = createSelector(selectEquipmentState, (state) => state.callState);
