import { Action } from '@ngrx/store';
import { IRoom } from 'src/models/iroom';

export enum roomActions {
    getRoom = '[Room] Get Room',
    getRoomSucces = '[Room] Get Room Succes',
    getRoomError = '[Room] Get Room Error'
}

export class GetRoom implements Action {
    readonly type = roomActions.getRoom;
    constructor(public payload: {id: number}) {}
}

export class GetRoomSucces implements Action {
    readonly type = roomActions.getRoomSucces;
    constructor(public payload: {room: IRoom}) {}
}

export class GetRoomError implements Action {
    readonly type = roomActions.getRoomError;
}

export type RoomUnion = GetRoom | GetRoomSucces | GetRoomError;

