import {Action} from '@ngrx/store';
import {Room} from 'src/models/room';

export enum RoomsActions {
    loadRooms = '[Rooms list] Load Rooms',
    loadRoomsSuccess = '[Rooms list] Load Rooms Success',
    loadRoomsError = '[Rooms list] Load Rooms Error',
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

export type roomsUnion = LoadRooms | LoadRoomsSuccess | LoadRoomsError;
