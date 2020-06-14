import { Action } from '@ngrx/store';
import { Equipment } from '@models/equipment';

export enum EquipmentActionsTypes {
	getEquipment = '[Equipment] Get Equipment',
	getEquipmentSuccess = '[Equipment] Get Equipment Success',
	getEquipmentError = '[Equipment] Get Equipment Error',
}

export class GetEquipment implements Action {
	readonly type = EquipmentActionsTypes.getEquipment;

	constructor(public payload: { id: Equipment['id'] }) {}
}

export class GetEquipmentSuccess implements Action {
	readonly type = EquipmentActionsTypes.getEquipmentSuccess;

	constructor(public payload: { equipment: Equipment }) {}
}

export class GetEquipmentError implements Action {
	readonly type = EquipmentActionsTypes.getEquipmentError;

	constructor(public payload: { errorMsg: string }) {}
}

export type EquipmentActions = GetEquipment | GetEquipmentSuccess | GetEquipmentError;
