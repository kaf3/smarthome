import { Action } from '@ngrx/store';
import { Room } from 'src/app/models/room';
import { Equipment } from '@models';

export enum RoomsActions {
	loadRooms = '[Rooms list] Load Rooms',
	loadRoomsSuccess = '[Rooms list] Load Rooms Success',
	loadRoomsError = '[Rooms list] Load Rooms Error',
	upsertAllRooms = '[Rooms list] Upsert All Rooms',
	upsertAllRoomsSuccess = '[Rooms list] Upsert All Rooms Success',
	upsertAllRoomsError = '[Rooms list] Upsert All Rooms Error',
}

export class LoadRooms implements Action {
	readonly type = RoomsActions.loadRooms;
}

export class LoadRoomsSuccess implements Action {
	readonly type = RoomsActions.loadRoomsSuccess;

	constructor(public payload: { rooms: Room[] }) {}
}

export class LoadRoomsError implements Action {
	readonly type = RoomsActions.loadRoomsError;

	constructor(public payload: { errorMsg: string }) {}
}

export class UpsertAllRooms implements Action {
	readonly type = RoomsActions.upsertAllRooms;

	constructor(public payload: { obj: Room[] | Room | Equipment }) {}
}

export class UpsertAllRoomsSuccess implements Action {
	readonly type = RoomsActions.upsertAllRoomsSuccess;

	constructor(public payload: { rooms: Room[] }) {}
}

export class UpsertAllRoomsError implements Action {
	readonly type = RoomsActions.upsertAllRoomsError;

	constructor(public payload: { errorMsg: string }) {}
}

export type RoomsUnion =
	| LoadRooms
	| LoadRoomsSuccess
	| LoadRoomsError
	| UpsertAllRooms
	| UpsertAllRoomsError
	| UpsertAllRoomsSuccess;
