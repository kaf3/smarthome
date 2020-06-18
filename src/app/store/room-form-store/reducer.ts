import { RoomFormActionTypes, RoomFormStateActions } from './actions';
import { Room } from '@models/room';
import {
	createFormGroupState,
	formGroupReducer,
	FormGroupState,
	reset,
	setValue,
	updateGroup,
	validate,
} from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

export const roomFormStateFeatureKey = 'roomForm';

export interface RoomFormValue {
	name: Room['name'] | null;
}

export const initialRoomFormValue: RoomFormValue = {
	name: null,
};

export type RoomFormState = FormGroupState<RoomFormValue>;

export const initialState: RoomFormState = createFormGroupState<RoomFormValue>(
	'RoomForm',
	initialRoomFormValue,
);

export function reducer(state = initialState, action: RoomFormStateActions): RoomFormState {
	state = formGroupReducer(state, action);
	state = updateGroup<RoomFormValue>({
		name: validate(required),
	})(state);

	switch (action.type) {
		case RoomFormActionTypes.LoadRoomForm:
			return setValue(reset(state), action.payload.value);

		default:
			return state;
	}
}
