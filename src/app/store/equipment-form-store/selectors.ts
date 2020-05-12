import { createFeatureSelector } from '@ngrx/store';
import { EQUIPMENT_FORM_FEATURE_KEY, EquipmentFormState } from './state';
import { AppState } from '../state';

export const selectEquipmentFormState = createFeatureSelector<AppState, EquipmentFormState>(
	EQUIPMENT_FORM_FEATURE_KEY,
);
