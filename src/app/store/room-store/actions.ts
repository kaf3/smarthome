import { Action } from '@ngrx/store';
import { Room } from '@models/room/room';
import { Hardware } from '@models/hardware';
import { RoomList } from '@models/rooms';

export enum RoomActionTypes {
	getRoom = '[Room] Get Room',
	getRoomSuccess = '[Room] Get Room Success',
	getRoomError = '[Room] Get Room Error',
	updateOneHardware = '[Room] Update One Hardware',
	updateOneHardwareSuccess = '[Room] Update One Hardware Success',
	updateOneHardwareFailure = '[Room] Update One Hardware Failure',
}

export class GetRoom implements Action {
	readonly type = RoomActionTypes.getRoom;

	constructor(public payload: { id: Room['id'] }) {}
}

export class GetRoomSuccess implements Action {
	readonly type = RoomActionTypes.getRoomSuccess;

	constructor(public payload: { room: Room }) {}
}

export class GetRoomError implements Action {
	readonly type = RoomActionTypes.getRoomError;

	constructor(public payload: { errorMsg: string }) {}
}

export class UpdateOneHardware implements Action {
	readonly type = RoomActionTypes.updateOneHardware;

	constructor(public payload: { hardware: Hardware; roomList: RoomList }) {}
}

export class UpdateOneHardwareSuccess implements Action {
	readonly type = RoomActionTypes.updateOneHardwareSuccess;

	constructor(public payload: { hardware: Hardware; roomList: RoomList }) {}
}

export class UpdateOneHardwareFailure implements Action {
	readonly type = RoomActionTypes.updateOneHardwareFailure;

	constructor(public payload: { errorMsg: string }) {}
}

export type RoomActions =
	| GetRoom
	| GetRoomSuccess
	| GetRoomError
	| UpdateOneHardware
	| UpdateOneHardwareSuccess
	| UpdateOneHardwareFailure;
