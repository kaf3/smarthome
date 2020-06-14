import { Action } from '@ngrx/store';
import { Room } from '@models/room/room';
import { RoomList } from '@models/rooms';

export enum RoomListActionsTypes {
	loadRoomList = '[Room list] Load Room List',
	loadRoomListSuccess = '[Room list] Load Room List Success',
	loadRoomListError = '[Room list] Load Room List Error',
	moveHardware = '[Room list] Move Hardware',
	moveHardwareSuccess = '[Room list] Move Hardware Success',
	moveHardwareError = '[Room list] Move Hardware Error',
	upsertRoom = '[Room list] Upsert Room',
	upsertRoomWhenLeft = '[Room list] Upsert Room When Left',
	upsertRoomListWhenLeft = '[Room list] Upsert RoomList When Left',
	openRoomList = '[Room list] Open Room List',
	UpsertRoomListCanceled = '[Room List] Upsert Room List Canceled',
}

export class LoadRoomList implements Action {
	readonly type = RoomListActionsTypes.loadRoomList;
}

export class LoadRoomListSuccess implements Action {
	readonly type = RoomListActionsTypes.loadRoomListSuccess;

	constructor(public payload: { roomList: RoomList }) {}
}

export class LoadRoomListError implements Action {
	readonly type = RoomListActionsTypes.loadRoomListError;

	constructor(public payload: { errorMsg: string }) {}
}

export class MoveHardware implements Action {
	readonly type = RoomListActionsTypes.moveHardware;

	constructor(public payload: { roomList: RoomList }) {}
}

export class MoveHardwareSuccess implements Action {
	readonly type = RoomListActionsTypes.moveHardwareSuccess;

	constructor(public payload: { roomList: RoomList }) {}
}

export class MoveHardwareError implements Action {
	readonly type = RoomListActionsTypes.moveHardwareError;

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

export class UpsertRoomListCanceled implements Action {
	readonly type = RoomListActionsTypes.UpsertRoomListCanceled;
}

export type RoomListActions =
	| LoadRoomList
	| LoadRoomListSuccess
	| LoadRoomListError
	| MoveHardware
	| MoveHardwareError
	| MoveHardwareSuccess
	| UpsertRoom
	| UpsertRoomWhenLeft
	| UpsertRoomListWhenLeft
	| OpenRoomList
	| UpsertRoomListCanceled;
