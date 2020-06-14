import { Action } from '@ngrx/store';
import { Equipment } from '@models/equipment';

export enum EquipmentFormActionTypes {
	loadEquipmentForm = '[Equipment Form] Load Form',
	loadEquipmentFormSuccess = '[Equipment Form] Load Form Success',
	loadEquipmentFormError = '[Equipment Form] Load Form error',
	updateEquipmentForm = '[EquipmentForm Form] Update Form',
	submitEquipmentForm = '[EquipmentForm Form] Submit Form',
	submitEquipmentFormSuccess = '[EquipmentForm Form] Submit Form Success',
}

export class LoadEquipmentForm implements Action {
	readonly type = EquipmentFormActionTypes.loadEquipmentForm;

	constructor(public payload: { equipment: Equipment }) {}
}

export class LoadEquipmentFormSuccess implements Action {
	readonly type = EquipmentFormActionTypes.loadEquipmentFormSuccess;

	constructor(public payload: { equipment: Equipment }) {}
}

export class LoadEquipmentFormError implements Action {
	readonly type = EquipmentFormActionTypes.loadEquipmentFormError;
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
	| LoadEquipmentFormError
	| LoadEquipmentFormSuccess
	| SubmitEquipmentFormSuccess;
