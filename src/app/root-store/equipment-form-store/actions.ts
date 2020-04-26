import {Action} from '@ngrx/store';
import {EquipmentFormValue} from './state';

export enum EquipmentFormActions {
    loadEquipmentForm = '[Equipment Form] Load Form',
    loadEquipmentFormSuccess = '[Equipment Form] Load Form Success',
    loadEquipmentFormError = '[Equipment Form] Load Form error',
    updateEquipmentForm = '[EquipmentForm Form] Update Form',
    submitEquipmentForm = '[EquipmentForm Form] Submit Form',
}

export class LoadEquipmentForm implements Action {
    readonly type = EquipmentFormActions.loadEquipmentForm;
}

export class LoadEquipmentFormSuccess implements Action {
    readonly type = EquipmentFormActions.loadEquipmentFormSuccess;
    constructor(public payload: EquipmentFormValue) {}
}

export class LoadEquipmentFormError implements Action {
    readonly type = EquipmentFormActions.loadEquipmentFormError;
}

export class UpdateEquipmentForm implements Action {
    readonly type = EquipmentFormActions.updateEquipmentForm;
}

export class SubmitEquipmentForm implements Action {
    readonly type = EquipmentFormActions.submitEquipmentForm;
}

export type EquipmentFormUnion =
    | UpdateEquipmentForm
    | SubmitEquipmentForm
    | LoadEquipmentForm
    | LoadEquipmentFormError
    | LoadEquipmentFormSuccess;
