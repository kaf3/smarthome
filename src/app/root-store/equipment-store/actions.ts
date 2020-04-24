import { Action } from '@ngrx/store';
import {IEquipment} from '../../../models/iequipment';

export enum EquipmentActions {
  getEquipment = '[Equipment] Get Equipment',
  getEquipmentSuccess = '[Equipment] Get Equipment Success',
  getEquipmentError = '[Equipment] Get Equipment Error'
}

export class GetEquipment implements Action {
  readonly type = EquipmentActions.getEquipment;
  constructor(public payload: {id: IEquipment['id']}) {
  }
}

export class GetEquipmentSuccess implements Action {
  readonly type = EquipmentActions.getEquipmentSuccess;
  constructor(public payload: {equipment: IEquipment}) {}
}

export class GetEquipmentError implements Action {
  readonly type = EquipmentActions.getEquipmentError;
}

export type EquipmentUnion = GetEquipment | GetEquipmentSuccess | GetEquipmentError;

