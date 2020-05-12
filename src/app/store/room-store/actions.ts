import { Action } from '@ngrx/store';
import { Room } from 'src/app/models/room';
import { Equipment } from '@models';

export enum RoomActionTypes {
	getRoom = '[Room] Get Room',
	getRoomSuccess = '[Room] Get Room Success',
	getRoomError = '[Room] Get Room Error',
	upsertRoomSuccess = '[Room] Upsert Room Success',
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

export class UpsertRoomSuccess implements Action {
	readonly type = RoomActionTypes.upsertRoomSuccess;

	constructor(public payload: { room: Room; activeEquipment: Equipment }) {}
}

export type RoomUnion = GetRoom | GetRoomSuccess | GetRoomError | UpsertRoomSuccess;
