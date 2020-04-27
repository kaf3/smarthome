import {Action} from '@ngrx/store';
import {Room} from 'src/models/room';
import {Update} from '@ngrx/entity';

export enum RoomsActions {
    loadRooms = '[Rooms list] Load Rooms',
    loadRoomsSuccess = '[Rooms list] Load Rooms Success',
    loadRoomsError = '[Rooms list] Load Rooms Error',
    updateRooms = '[Rooms list] Update Rooms',
    updateRoomsSuccess = '[Rooms list] Update Rooms Success',
    updateRoomsError = '[Rooms list] Update Rooms Error',
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

export class UpdateRooms implements Action {
    readonly type = RoomsActions.updateRooms;
}

export class UpdateRoomsSuccess implements Action {
    readonly type = RoomsActions.updateRoomsSuccess;

    constructor(public payload: {update: Update<Room>}) {}
}

export class UpdateRoomsError implements Action {
    readonly type = RoomsActions.updateRoomsError;
}

export type roomsUnion =
    | LoadRooms
    | LoadRoomsSuccess
    | LoadRoomsError
    | UpdateRooms
    | UpdateRoomsSuccess
    | UpdateRoomsError;
