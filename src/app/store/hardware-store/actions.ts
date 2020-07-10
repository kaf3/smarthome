import { Action } from '@ngrx/store';
import { Hardware } from '@models/hardware';
import { Equipment } from '@models/equipment';
import { Room } from '@models/room';

export enum HardwareActionTypes {
	LoadHardware = '[Hardware] Load Hardware',
	LoadHardwareSuccess = '[Hardware] Load Hardware Success',
	LoadHardwareFailure = '[Hardware] Load Hardware Failure',
	UpdateOneEquipment = '[Hardware] Update One Equipment',
	UpdateOneEquipmentSuccess = '[Hardware] Update One Equipment Success',
	UpdateOneEquipmentFailure = '[Hardware] Update One Equipment Failure',
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

export class UpdateOneEquipment implements Action {
	readonly type = HardwareActionTypes.UpdateOneEquipment;

	constructor(public payload: { equipment: Equipment; room: Room; hardware: Hardware }) {}
}

export class UpdateOneEquipmentSuccess implements Action {
	readonly type = HardwareActionTypes.UpdateOneEquipmentSuccess;

	constructor(public payload: { equipment: Equipment; room: Room; hardware: Hardware }) {}
}

export class UpdateOneEquipmentFailure implements Action {
	readonly type = HardwareActionTypes.UpdateOneEquipmentFailure;

	constructor(public payload: { errorMsg: string }) {}
}

export type HardwareActions =
	| LoadHardware
	| LoadHardwareSuccess
	| LoadHardwareFailure
	| UpdateOneEquipment
	| UpdateOneEquipmentFailure
	| UpdateOneEquipmentSuccess;
