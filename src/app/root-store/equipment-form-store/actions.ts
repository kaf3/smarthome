import {Action} from '@ngrx/store';
import {Equipment} from '@models';

export enum EquipmentFormActions {
    loadEquipmentForm = '[Equipment Form] Load Form',
    loadEquipmentFormSuccess = '[Equipment Form] Load Form Success',
    loadEquipmentFormError = '[Equipment Form] Load Form error',
    updateEquipmentForm = '[EquipmentForm Form] Update Form',
    submitEquipmentForm = '[EquipmentForm Form] Submit Form',
    submitEquipmentFormSuccess = '[EquipmentForm Form] Submit Form Success',
}

export class LoadEquipmentForm implements Action {
    readonly type = EquipmentFormActions.loadEquipmentForm;
}

export class LoadEquipmentFormSuccess implements Action {
    readonly type = EquipmentFormActions.loadEquipmentFormSuccess;
    constructor(public payload: {equipment: Equipment}) {}
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

export class SubmitEquipmentFormSuccess implements Action {
    readonly type = EquipmentFormActions.submitEquipmentFormSuccess;
}

export type EquipmentFormUnion =
    | UpdateEquipmentForm
    | SubmitEquipmentForm
    | LoadEquipmentForm
    | LoadEquipmentFormError
    | LoadEquipmentFormSuccess
    | SubmitEquipmentFormSuccess;
