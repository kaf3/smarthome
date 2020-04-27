import {Action} from '@ngrx/store';
import {Room} from 'src/models/room';
import {RoomDTO} from '../../../models/roomDTO';

export enum RoomsActions {
    loadRooms = '[Rooms list] Load Rooms',
    loadRoomsSuccess = '[Rooms list] Load Rooms Success',
    loadRoomsError = '[Rooms list] Load Rooms Error',
    upsertOneRoom = '[Rooms list] Upsert One Room',
    upsertOneRoomSuccess = '[Rooms list] Upsert One Room Success',
    upsertOneRoomError = '[Rooms list] Upsert One Room Error',
}

export class LoadRooms implements Action {
    readonly type = RoomsActions.loadRooms;
}

export class LoadRoomsSuccess implements Action {
    readonly type = RoomsActions.loadRoomsSuccess;

    constructor(public payload: {rooms: Room[]}) {}
}

export class LoadRoomsError implements Action {
    readonly type = RoomsActions.loadRoomsError;
}

export class UpsertOneRoom implements Action {
    readonly type = RoomsActions.upsertOneRoom;
    constructor(public payload: {roomDTO: RoomDTO}) {}
}

export class UpsertOneRoomSuccess implements Action {
    readonly type = RoomsActions.upsertOneRoomSuccess;

    constructor(public payload: {room: Room}) {}
}

export class UpsertOneRoomError implements Action {
    readonly type = RoomsActions.upsertOneRoomError;
}

export type roomsUnion =
    | LoadRooms
    | LoadRoomsSuccess
    | LoadRoomsError
    | UpsertOneRoom
    | UpsertOneRoomSuccess
    | UpsertOneRoomError;
