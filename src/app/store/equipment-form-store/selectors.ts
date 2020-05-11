import { createFeatureSelector } from '@ngrx/store';
import { EquipmentFormState } from './state';

export const selectEquipmentFormState = createFeatureSelector<EquipmentFormState>('equipment-form');
