import {Action} from '@ngrx/store';
import { IRoom } from 'src/models/iroom';

export enum roomsActions {
    loadRooms = '[Rooms list] Load Rooms',
    loadRoomsSucces = '[Rooms list] Load Rooms Succes',
    loadRoomsError = '[Rooms list] Load Rooms Error'
}

export class LoadRooms implements Action {
    readonly type = roomsActions.loadRooms;
}

export class LoadRoomsSucces implements Action {
    readonly type = roomsActions.loadRoomsSucces;

    constructor(public payload: {rooms: IRoom[]}) {}
}

export class LoadRoomsError implements Action {
    readonly type = roomsActions.loadRoomsError;
}

export type roomsUnion = LoadRooms | LoadRoomsSucces | LoadRoomsError;
