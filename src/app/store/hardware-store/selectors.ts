import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Equipment } from '@models/equipment';
import { Hardware } from '@models/hardware';
import * as fromHardware from './reducer';

export const selectHardwareState = createFeatureSelector<fromHardware.HardwareState>(
	fromHardware.hardwareFeatureKey,
);

export const selectHardware = createSelector(selectHardwareState, (state) => state.hardware);

export const selectEquipmentEntityState = createSelector(
	selectHardware,
	(hardware) => hardware.equipmentEntityState,
);

export const { selectIds, selectEntities, selectAll, selectTotal } = Hardware.adapter.getSelectors(
	selectEquipmentEntityState,
);

export const selectById = createSelector(
	selectEntities,
	(equipmentCollection: Dictionary<Equipment>, id: Equipment['id']) =>
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		equipmentCollection[id ?? '']!,
);

export const selectCallState = createSelector(selectHardwareState, (state) => state.callState);
