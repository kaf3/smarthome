import { HardwareFormActions, HardwareFormActionTypes } from './actions';
import { FeatureKey } from '../state';
import { Hardware } from '@models/hardware';
import { Room } from '@models/room';
import {
	createFormGroupState,
	formGroupReducer,
	FormGroupState,
	reset,
	setValue,
} from 'ngrx-forms';

export const hardwareFormFeatureKey: FeatureKey = 'hardwareForm';

export interface HardwareFormValue {
	name: Hardware['name'] | null;
	roomName: Room['name'] | null;
}

export const initialHardwareFormValue: HardwareFormValue = {
	name: null,
	roomName: null,
};

export type HardwareFormState = FormGroupState<HardwareFormValue>;

export const initialHardwareFormState: HardwareFormState = createFormGroupState<HardwareFormValue>(
	'HardwareForm',
	initialHardwareFormValue,
);

export function reducer(
	state = initialHardwareFormState,
	action: HardwareFormActions,
): HardwareFormState {
	state = formGroupReducer(state, action);

	switch (action.type) {
		case HardwareFormActionTypes.LoadHardwareForm:
			return state;

		case HardwareFormActionTypes.LoadHardwareFormSuccess:
			return setValue(state, action.payload.value);

		case HardwareFormActionTypes.LoadHardwareFormFailure:
			return state;

		case HardwareFormActionTypes.SubmitHardwareForm:
			return reset(state);

		default:
			return state;
	}
}
