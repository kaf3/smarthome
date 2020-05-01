import {Action} from '@ngrx/store';
import {Equipment} from '@models';

export enum EquipmentActions {
    getEquipment = '[Equipment] Get Equipment',
    getEquipmentSuccess = '[Equipment] Get Equipment Success',
    getEquipmentError = '[Equipment] Get Equipment Error',
}

export class GetEquipment implements Action {
    readonly type = EquipmentActions.getEquipment;

    constructor(public payload: {id: Equipment['id']}) {}
}

export class GetEquipmentSuccess implements Action {
    readonly type = EquipmentActions.getEquipmentSuccess;

    constructor(public payload: {equipment: Equipment}) {}
}

export class GetEquipmentError implements Action {
    readonly type = EquipmentActions.getEquipmentError;
}

export type EquipmentUnion = GetEquipment | GetEquipmentSuccess | GetEquipmentError;
