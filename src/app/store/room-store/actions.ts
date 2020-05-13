import { Action } from '@ngrx/store';
import { Room } from 'src/app/models/room';

export enum RoomActionTypes {
	getRoom = '[Room] Get Room',
	getRoomSuccess = '[Room] Get Room Success',
	getRoomError = '[Room] Get Room Error',
}

export class GetRoom implements Action {
	readonly type = RoomActionTypes.getRoom;

	constructor(public payload: { roomName: Room['roomName'] }) {}
}

export class GetRoomSuccess implements Action {
	readonly type = RoomActionTypes.getRoomSuccess;

	constructor(public payload: { room: Room }) {}
}

export class GetRoomError implements Action {
	readonly type = RoomActionTypes.getRoomError;

	constructor(public payload: { errorMsg: string }) {}
}

export type RoomUnion = GetRoom | GetRoomSuccess | GetRoomError;
