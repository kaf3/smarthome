import { Action } from '@ngrx/store';
import { Room } from '@models/room/room';
import { RoomList } from '@models/room-list';

export enum RoomListActionsTypes {
	loadRoomList = '[Room list] Load Room List',
	loadRoomListSuccess = '[Room list] Load Room List Success',
	loadRoomListError = '[Room list] Load Room List Error',
	moveHardware = '[Room list] Move Hardware',
	moveHardwareSuccess = '[Room list] Move Hardware Success',
	moveHardwareError = '[Room list] Move Hardware Error',
	updateRoom = '[Room list] Update Room',
	updateRoomSuccess = '[Room list] Update Room Success',
	updateRoomFailure = '[Room list] Update Room Failure',
	addRoom = '[Room list] Add Room',
	addRoomSuccess = '[Room list] Add Room Success',
	addRoomFailure = '[Room list] Add Room Failure',
	upsertRoomWhenLeft = '[Room list] Upsert Room When Left',
	upsertRoomListWhenLeft = '[Room list] Upsert RoomList When Left',
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

export class UpdateRoom implements Action {
	readonly type = RoomListActionsTypes.updateRoom;

	constructor(public payload: { room: Room }) {}
}

export class UpdateRoomSuccess implements Action {
	readonly type = RoomListActionsTypes.updateRoomSuccess;

	constructor(public payload: { room: Room }) {}
}

export class UpdateRoomFailure implements Action {
	readonly type = RoomListActionsTypes.updateRoomFailure;

	constructor(public payload: { errorMsg: string }) {}
}

export class UpsertRoomWhenLeft implements Action {
	readonly type = RoomListActionsTypes.upsertRoomWhenLeft;

	constructor(public payload: { room: Room }) {}
}

export class UpsertRoomListWhenLeft implements Action {
	readonly type = RoomListActionsTypes.upsertRoomListWhenLeft;

	constructor(public payload: { roomList: RoomList }) {}
}

export class UpsertRoomListCanceled implements Action {
	readonly type = RoomListActionsTypes.UpsertRoomListCanceled;
}

export class AddRoom implements Action {
	readonly type = RoomListActionsTypes.addRoom;

	constructor(public payload: { room: Room }) {}
}

export class AddRoomSuccess implements Action {
	readonly type = RoomListActionsTypes.addRoomSuccess;

	constructor(public payload: { room: Room }) {}
}

export class AddRoomFailure implements Action {
	readonly type = RoomListActionsTypes.addRoomFailure;

	constructor(public payload: { errorMsg: string }) {}
}

export type RoomListActions =
	| LoadRoomList
	| LoadRoomListSuccess
	| LoadRoomListError
	| MoveHardware
	| MoveHardwareError
	| MoveHardwareSuccess
	| UpdateRoom
	| UpdateRoomSuccess
	| UpdateRoomFailure
	| UpsertRoomWhenLeft
	| UpsertRoomListWhenLeft
	| UpsertRoomListCanceled
	| AddRoom
	| AddRoomSuccess
	| AddRoomFailure;
