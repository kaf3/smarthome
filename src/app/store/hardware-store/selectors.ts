import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHardware from './reducer';
import { hardwareAdapter } from './reducer';
import { Dictionary } from '@ngrx/entity';
import { Equipment } from '@models/equipment';
import { Hardware } from '@models/hardware';

export const selectHardwareState = createFeatureSelector<fromHardware.HardwareState>(
	fromHardware.hardwareFeatureKey,
);

export const { selectIds, selectEntities, selectAll, selectTotal } = hardwareAdapter.getSelectors(
	selectHardwareState,
);

export const selectById = createSelector(
	selectEntities,
	(equipmentCollection: Dictionary<Equipment>, id: Equipment['id']) =>
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		equipmentCollection[id ?? '']!,
);

export const selectCallState = createSelector(selectHardwareState, (state) => state.callState);

export const selectHardware = createSelector(
	selectHardwareState,
	selectAll,
	(state, equipments) =>
		new Hardware({ ...state.baseHardware, activeEquipment: state.activeEquipment, equipments }),
);
