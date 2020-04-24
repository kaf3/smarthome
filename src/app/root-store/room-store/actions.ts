import {Action} from '@ngrx/store';
import {IRoom} from 'src/models/iroom';

export enum RoomActions {
    getRoom = '[Room] Get Room',
    getRoomSuccess = '[Room] Get Room Success',
    getRoomError = '[Room] Get Room Error',
}

export class GetRoom implements Action {
    readonly type = RoomActions.getRoom;

    constructor(public payload: {id: number}) {}
}

export class GetRoomSuccess implements Action {
    readonly type = RoomActions.getRoomSuccess;

    constructor(public payload: {room: IRoom}) {}
}

export class GetRoomError implements Action {
    readonly type = RoomActions.getRoomError;
}

export type RoomUnion = GetRoom | GetRoomSuccess | GetRoomError;
