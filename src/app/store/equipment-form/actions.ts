import { Action } from '@ngrx/store';
import { Equipment } from '@models/equipment';

export enum EquipmentFormActionTypes {
	loadEquipmentForm = '[Equipment Form] Load Form',
	updateEquipmentForm = '[EquipmentForm Form] Update Form',
	submitEquipmentForm = '[EquipmentForm Form] Submit Form',
	submitEquipmentFormSuccess = '[EquipmentForm Form] Submit Form Success',
}

export class LoadEquipmentForm implements Action {
	readonly type = EquipmentFormActionTypes.loadEquipmentForm;

	constructor(public payload: { equipment: Equipment }) {}
}

export class UpdateEquipmentForm implements Action {
	readonly type = EquipmentFormActionTypes.updateEquipmentForm;
}

export class SubmitEquipmentForm implements Action {
	readonly type = EquipmentFormActionTypes.submitEquipmentForm;

	constructor(public payload: { equipment: Equipment }) {}
}

export class SubmitEquipmentFormSuccess implements Action {
	readonly type = EquipmentFormActionTypes.submitEquipmentFormSuccess;
}

export type EquipmentFormActions =
	| UpdateEquipmentForm
	| SubmitEquipmentForm
	| LoadEquipmentForm
	| SubmitEquipmentFormSuccess;
