import { Action } from '@ngrx/store';
import { HardwareFormValue } from './reducer';

export enum HardwareFormActionTypes {
	LoadHardwareForm = '[Hardware Form] Load HardwareForm',
	LoadHardwareFormSuccess = '[Hardware Form] Load Hardware Form Success',
	LoadHardwareFormFailure = '[Hardware Form] Load Hardware Form Failure',
	SubmitHardwareForm = '[Hardware Form] Submit Hardware Form',
}

export class LoadHardwareForm implements Action {
	readonly type = HardwareFormActionTypes.LoadHardwareForm;
}

export class LoadHardwareFormSuccess implements Action {
	readonly type = HardwareFormActionTypes.LoadHardwareFormSuccess;
	constructor(public payload: { value: HardwareFormValue }) {}
}

export class LoadHardwareFormFailure implements Action {
	readonly type = HardwareFormActionTypes.LoadHardwareFormFailure;
	constructor(public payload: { error: any }) {}
}

export class SubmitHardwareForm implements Action {
	readonly type = HardwareFormActionTypes.SubmitHardwareForm;
}

export type HardwareFormActions =
	| LoadHardwareForm
	| LoadHardwareFormSuccess
	| LoadHardwareFormFailure
	| SubmitHardwareForm;
