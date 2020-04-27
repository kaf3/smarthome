import {Action} from '@ngrx/store';
import {Room} from 'src/models/room';

export enum RoomActions {
    getRoom = '[Room] Get Room',
    getRoomSuccess = '[Room] Get Room Success',
    getRoomError = '[Room] Get Room Error',
}

export class GetRoom implements Action {
    readonly type = RoomActions.getRoom;

    constructor(public payload: {roomName: Room['roomName']}) {}
}

export class GetRoomSuccess implements Action {
    readonly type = RoomActions.getRoomSuccess;

    constructor(public payload: {room: Room}) {}
}

export class GetRoomError implements Action {
    readonly type = RoomActions.getRoomError;
}

export type RoomUnion = GetRoom | GetRoomSuccess | GetRoomError;
