import { Action } from '@ngrx/store';
import { Room } from 'src/app/models/room';
import { Equipment, RoomList } from '@models';

export enum RoomsActionsTypes {
	loadRooms = '[Rooms list] Load Rooms',
	loadRoomsSuccess = '[Rooms list] Load Rooms Success',
	loadRoomsError = '[Rooms list] Load Rooms Error',
	upsertAllRooms = '[Rooms list] Upsert All Rooms',
	upsertAllRoomsSuccess = '[Rooms list] Upsert All Rooms Success',
	upsertAllRoomsError = '[Rooms list] Upsert All Rooms Error',
	upsertRoom = '[Rooms list] Upsert Room',
	upsertRoomWhenLeft = '[Room list] Upsert Room When Left',
	upsertRoomListWhenLeft = '[Room list] Upsert RoomList When Left',
	openRoomList = '[Room list] Open Room List',
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

export class UpsertRoom implements Action {
	readonly type = RoomsActionsTypes.upsertRoom;

	constructor(public payload: { room: Room }) {}
}

export class UpsertRoomWhenLeft implements Action {
	readonly type = RoomsActionsTypes.upsertRoomWhenLeft;

	constructor(public payload: { room: Room }) {}
}

export class UpsertRoomListWhenLeft implements Action {
	readonly type = RoomsActionsTypes.upsertRoomListWhenLeft;

	constructor(public payload: { roomList: RoomList }) {}
}

export class OpenRoomList implements Action {
	readonly type = RoomsActionsTypes.openRoomList;
}

export type RoomsUnion =
	| LoadRooms
	| LoadRoomsSuccess
	| LoadRoomsError
	| UpsertAllRooms
	| UpsertAllRoomsError
	| UpsertAllRoomsSuccess
	| UpsertRoom
	| UpsertRoomWhenLeft
	| UpsertRoomListWhenLeft
	| OpenRoomList;
