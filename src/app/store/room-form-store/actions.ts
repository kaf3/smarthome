import { Action } from '@ngrx/store';
import { RoomFormValue } from './reducer';

export enum RoomFormActionTypes {
	LoadRoomForm = '[Room Form] Load Room Form',
	SubmitRoomForm = '[Room Form] Submit Room Form',
}

export class LoadRoomForm implements Action {
	readonly type = RoomFormActionTypes.LoadRoomForm;

	constructor(public readonly payload: { value: RoomFormValue }) {}
}

export class SubmitRoomForm implements Action {
	readonly type = RoomFormActionTypes.SubmitRoomForm;
}

export type RoomFormStateActions = LoadRoomForm | SubmitRoomForm;
