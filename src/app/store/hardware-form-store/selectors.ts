import { createFeatureSelector } from '@ngrx/store';
import * as fromHardwareForm from './reducer';
import { AppState } from '../state';

export const selectHardwareFormState = createFeatureSelector<
	AppState,
	fromHardwareForm.HardwareFormState
>(fromHardwareForm.hardwareFormFeatureKey);
