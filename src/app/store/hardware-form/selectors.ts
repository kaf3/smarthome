import { createFeatureSelector } from '@ngrx/store';
import * as fromHardwareForm from './reducer';

export const selectHardwareFormState = createFeatureSelector<fromHardwareForm.HardwareFormState>(
	fromHardwareForm.hardwareFormFeatureKey,
);
