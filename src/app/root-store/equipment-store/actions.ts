import { Action } from '@ngrx/store';
import {IEquipment} from '../../../models/iequipment';

export enum equipmentActions {
  getEquipment = '[Equipment] Get Equipment',
  getEquipmentSuccess = '[Equipment] Get Equipment Success',
  getEquipmentError = '[Equipment] Get Equipment Error'
}

export class GetEquipment implements Action {
  readonly type = equipmentActions.getEquipment;
}

export class GetEquipmentSuccess implements Action {
  readonly type = equipmentActions.getEquipmentSuccess;
  constructor(public payload: {equipment: IEquipment}) {}
}

export class GetEquipmentError implements Action {
  readonly type = equipmentActions.getEquipmentError;
}

export type EquipmentUnion = GetEquipment | GetEquipmentSuccess | GetEquipmentError;

