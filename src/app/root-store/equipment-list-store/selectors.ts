import {createFeatureSelector} from '@ngrx/store';
import {equipmentListAdapter, EquipmentListState} from './state';

const selectEquipmentListState = createFeatureSelector<EquipmentListState>(
    'equipment-list',
);

export const selectEquipmentList = equipmentListAdapter.getSelectors(
    selectEquipmentListState,
).selectAll;
