import { Action } from '@ngrx/store';
import { Hardware } from '@models/hardware';

export enum HardwareActionTypes {
	LoadHardware = '[Hardware] Load Hardware',
	LoadHardwareSuccess = '[Hardware] Load Hardware Success',
	LoadHardwareFailure = '[Hardware] Load Hardware Failure',
}

export class LoadHardware implements Action {
	readonly type = HardwareActionTypes.LoadHardware;

	constructor(public payload: { id: Hardware['id'] }) {}
}

export class LoadHardwareSuccess implements Action {
	readonly type = HardwareActionTypes.LoadHardwareSuccess;
	constructor(public payload: { hardware: Hardware }) {}
}

export class LoadHardwareFailure implements Action {
	readonly type = HardwareActionTypes.LoadHardwareFailure;
	constructor(public payload: { errorMsg: string }) {}
}

export type HardwareActions = LoadHardware | LoadHardwareSuccess | LoadHardwareFailure;
