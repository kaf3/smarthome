import {Action} from '@ngrx/store';
import {Equipment} from '../../../models/equipment';

export enum EquipmentListActions {
    loadEquipmentList = '[EquipmentList list] Load EquipmentList',
    loadEquipmentListSuccess = '[EquipmentList list] Load EquipmentList Success',
    loadEquipmentListError = '[EquipmentList list] Load EquipmentList Error',
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

export type EquipmentListUnion =
    | LoadEquipmentList
    | LoadEquipmentListSuccess
    | LoadEquipmentListError;
