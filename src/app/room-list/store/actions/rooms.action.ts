import {Action} from '@ngrx/store';
import { IRoom } from 'src/models/iroom';

export enum roomsActions {
    loadRooms = '[Rooms list] Load Rooms',
    loadRoomsSucces = '[Rooms list] Load Rooms Succes',
    loadRoomsError = '[Rooms list] Load Rooms Error'
}

export class loadRooms implements Action {
    readonly type = roomsActions.loadRooms
}

export class loadRoomsSucces implements Action {
    readonly type = roomsActions.loadRoomsSucces;

    constructor(public payload: {rooms: IRoom[]}) {}
}

export class loadRoomsError implements Action {
    readonly type = roomsActions.loadRoomsError
}

export type roomsUnion = loadRooms | loadRoomsSucces | loadRoomsError;