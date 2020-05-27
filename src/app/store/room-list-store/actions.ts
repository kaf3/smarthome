import { Action } from '@ngrx/store';
import { Room } from '@models/room/room';
import { Equipment } from '@models/equipment';
import { RoomList } from '@models/rooms';

export enum RoomListActionsTypes {
	loadRoomList = '[Room list] Load Room List',
	loadRoomListSuccess = '[Room list] Load Room List Success',
	loadRoomListError = '[Room list] Load Room List Error',
	upsertAllRooms = '[Room list] Upsert All Rooms',
	upsertAllRoomsSuccess = '[Room list] Upsert All Rooms Success',
	upsertAllRoomsError = '[Room list] Upsert All Rooms Error',
	upsertRoom = '[Room list] Upsert Room',
	upsertRoomWhenLeft = '[Room list] Upsert Room When Left',
	upsertRoomListWhenLeft = '[Room list] Upsert RoomList When Left',
	openRoomList = '[Room list] Open Room List',
}

export class LoadRooms implements Action {
	readonly type = RoomListActionsTypes.loadRoomList;
}

export class LoadRoomsSuccess implements Action {
	readonly type = RoomListActionsTypes.loadRoomListSuccess;

	constructor(public payload: { roomList: RoomList }) {}
}

export class LoadRoomsError implements Action {
	readonly type = RoomListActionsTypes.loadRoomListError;

	constructor(public payload: { errorMsg: string }) {}
}

export class UpsertAllRooms implements Action {
	readonly type = RoomListActionsTypes.upsertAllRooms;

	constructor(public payload: { obj: Room[] | Room | Equipment }) {}
}

export class UpsertAllRoomsSuccess implements Action {
	readonly type = RoomListActionsTypes.upsertAllRoomsSuccess;

	constructor(public payload: { rooms: Room[] }) {}
}

export class UpsertAllRoomsError implements Action {
	readonly type = RoomListActionsTypes.upsertAllRoomsError;

	constructor(public payload: { errorMsg: string }) {}
}

export class UpsertRoom implements Action {
	readonly type = RoomListActionsTypes.upsertRoom;

	constructor(public payload: { room: Room }) {}
}

export class UpsertRoomWhenLeft implements Action {
	readonly type = RoomListActionsTypes.upsertRoomWhenLeft;

	constructor(public payload: { room: Room }) {}
}

export class UpsertRoomListWhenLeft implements Action {
	readonly type = RoomListActionsTypes.upsertRoomListWhenLeft;

	constructor(public payload: { roomList: RoomList }) {}
}

export class OpenRoomList implements Action {
	readonly type = RoomListActionsTypes.openRoomList;
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
