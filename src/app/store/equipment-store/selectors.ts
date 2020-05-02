import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EquipmentState} from './state';

const selectEquipmentState = createFeatureSelector<EquipmentState>('equipment');

export const selectEquipment = createSelector(
    selectEquipmentState,
    (equipmentState: EquipmentState) => equipmentState.equipment,
);
