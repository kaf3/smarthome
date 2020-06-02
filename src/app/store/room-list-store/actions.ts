import { Action } from '@ngrx/store';
import { Room } from '@models/room/room';
import { Equipment } from '@models/equipment';
import { RoomList } from '@models/rooms';
import { Hardware } from '@models/hardware';

export enum RoomListActionsTypes {
	loadRoomList = '[Room list] Load Room List',
	loadRoomListSuccess = '[Room list] Load Room List Success',
	loadRoomListError = '[Room list] Load Room List Error',
	upsertRoomList = '[Room list] Upsert Room List',
	upsertRoomListSuccess = '[Room list] Upsert Room List Success',
	upsertRoomListError = '[Room list] Upsert Room List Error',
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

export class UpsertRoomList implements Action {
	readonly type = RoomListActionsTypes.upsertRoomList;

	constructor(public payload: { obj: RoomList | Room | Equipment | Hardware }) {}
}

export class UpsertRoomListSuccess implements Action {
	readonly type = RoomListActionsTypes.upsertRoomListSuccess;

	constructor(public payload: { roomList: RoomList }) {}
}

export class UpsertRoomListError implements Action {
	readonly type = RoomListActionsTypes.upsertRoomListError;

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

export type RoomsUnion =
	| LoadRoomList
	| LoadRoomListSuccess
	| LoadRoomListError
	| UpsertRoomList
	| UpsertRoomListError
	| UpsertRoomListSuccess
	| UpsertRoom
	| UpsertRoomWhenLeft
	| UpsertRoomListWhenLeft
	| OpenRoomList
	| UpsertRoomListCanceled;
