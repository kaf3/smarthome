import { createFeatureSelector } from '@ngrx/store';
import * as fromRoomFormState from './reducer';

export const selectRoomFormState = createFeatureSelector<fromRoomFormState.RoomFormState>(
	fromRoomFormState.roomFormStateFeatureKey,
);
