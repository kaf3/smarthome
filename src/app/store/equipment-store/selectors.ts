import {createFeatureSelector, createSelector} from '@ngrx/store';
import {EquipmentState} from './state';
import {getError, isLoaded, isLoading} from '@helpers';

const selectEquipmentState = createFeatureSelector<EquipmentState>('equipment');

export const selectEquipment = createSelector(
    selectEquipmentState,
    (equipmentState: EquipmentState) => equipmentState.equipment,
);

export const selectLoading = createSelector(
    selectEquipmentState,
    isLoading,
);

export const selectLoaded = createSelector(
    selectEquipmentState,
    isLoaded,
);

export const selectError = createSelector(
    selectEquipmentState,
    getError,
);
