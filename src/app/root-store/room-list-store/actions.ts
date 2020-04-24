import {Action} from '@ngrx/store';
import {Room} from 'src/models/room';

export enum roomsActions {
    loadRooms = '[Rooms list] Load Rooms',
    loadRoomsSucces = '[Rooms list] Load Rooms Succes',
    loadRoomsError = '[Rooms list] Load Rooms Error',
}

export class LoadRooms implements Action {
    readonly type = roomsActions.loadRooms;
}

export class LoadRoomsSucces implements Action {
    readonly type = roomsActions.loadRoomsSucces;

    constructor(public payload: {rooms: Room[]}) {}
}

export class LoadRoomsError implements Action {
    readonly type = roomsActions.loadRoomsError;
}

export type roomsUnion = LoadRooms | LoadRoomsSucces | LoadRoomsError;
