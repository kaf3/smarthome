import {Action} from '@ngrx/store';
import {Equipment} from '../../../models/equipment';
import {Update} from '@ngrx/entity';

export enum EquipmentListActions {
    loadEquipmentList = '[EquipmentList list] Load EquipmentList',
    loadEquipmentListSuccess = '[EquipmentList list] Load EquipmentList Success',
    loadEquipmentListError = '[EquipmentList list] Load EquipmentList Error',
    upsertOneEquipment = '[EquipmentList List] Upsert One Equipment',
    upsertOneEquipmentSuccess = '[EquipmentList List] Upsert One Equipment Success',
    upsertOneEquipmentError = '[EquipmentList List] Upsert One Equipment Error',
}

export class LoadEquipmentList implements Action {
    readonly type = EquipmentListActions.loadEquipmentList;
}

export class LoadEquipmentListSuccess implements Action {
    readonly type = EquipmentListActions.loadEquipmentListSuccess;

    constructor(public payload: {equipmentList: Equipment[]}) {}
}

export class LoadEquipmentListError implements Action {
    readonly type = EquipmentListActions.loadEquipmentListError;
}

export class UpsertOneEquipment implements Action {
    readonly type = EquipmentListActions.upsertOneEquipment;
    constructor(public payload: {equipment: Equipment}) {}
}

export class UpsertOneEquipmentSuccess implements Action {
    readonly type = EquipmentListActions.upsertOneEquipmentSuccess;

    constructor(public payload: {equipment: Equipment}) {}
}

export class UpsertOneEquipmentError implements Action {
    readonly type = EquipmentListActions.upsertOneEquipmentError;
}

export type EquipmentListUnion =
    | LoadEquipmentList
    | LoadEquipmentListSuccess
    | LoadEquipmentListError
    | UpsertOneEquipment
    | UpsertOneEquipmentSuccess
    | UpsertOneEquipmentError;
