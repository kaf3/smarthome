import { Action } from '@ngrx/store';
import { Room } from 'src/app/models/room';
import { Equipment } from '@models';

export enum RoomsActionsTypes {
	loadRooms = '[Rooms list] Load Rooms',
	loadRoomsSuccess = '[Rooms list] Load Rooms Success',
	loadRoomsError = '[Rooms list] Load Rooms Error',
	upsertAllRooms = '[Rooms list] Upsert All Rooms',
	upsertAllRoomsSuccess = '[Rooms list] Upsert All Rooms Success',
	upsertAllRoomsError = '[Rooms list] Upsert All Rooms Error',
	upsertRoom = '[Rooms list] Upsert Room',
}

export class LoadRooms implements Action {
	readonly type = RoomsActionsTypes.loadRooms;
}

export class LoadRoomsSuccess implements Action {
	readonly type = RoomsActionsTypes.loadRoomsSuccess;

	constructor(public payload: { rooms: Room[] }) {}
}

export class LoadRoomsError implements Action {
	readonly type = RoomsActionsTypes.loadRoomsError;

	constructor(public payload: { errorMsg: string }) {}
}

export class UpsertAllRooms implements Action {
	readonly type = RoomsActionsTypes.upsertAllRooms;

	constructor(public payload: { obj: Room[] | Room | Equipment }) {}
}

export class UpsertAllRoomsSuccess implements Action {
	readonly type = RoomsActionsTypes.upsertAllRoomsSuccess;

	constructor(public payload: { rooms: Room[] }) {}
}

export class UpsertAllRoomsError implements Action {
	readonly type = RoomsActionsTypes.upsertAllRoomsError;

	constructor(public payload: { errorMsg: string }) {}
}

export class UpsertRoom {
	readonly type = RoomsActionsTypes.upsertRoom;

	constructor(public payload: { room: Room }) {}
}

export type RoomsUnion =
	| LoadRooms
	| LoadRoomsSuccess
	| LoadRoomsError
	| UpsertAllRooms
	| UpsertAllRoomsError
	| UpsertAllRoomsSuccess
	| UpsertRoom;
