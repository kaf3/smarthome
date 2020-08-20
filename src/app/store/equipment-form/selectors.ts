import { createFeatureSelector } from '@ngrx/store';
import { EQUIPMENT_FORM_FEATURE_KEY, EquipmentFormState } from './reducer';

export const selectEquipmentFormState = createFeatureSelector<EquipmentFormState>(
	EQUIPMENT_FORM_FEATURE_KEY,
);
