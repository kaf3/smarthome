import { initialRoom, RoomDTO } from '@models/room';
import { RoomList } from '@models/rooms/room-list';

export interface RoomCollection {
	[roomId: string]: RoomDTO;
}

interface IRoomListDTO {
	readonly roomCollection: RoomCollection;
}

export class RoomListDTO implements IRoomListDTO {
	public readonly roomCollection: RoomCollection;

	constructor(source: RoomListDTO | IRoomListDTO) {
		this.roomCollection = { ...source.roomCollection };
	}

	public createDomain(): RoomList {
		const rooms = Object.entries(this.roomCollection).map(([id, roomDTO]) =>
			roomDTO.createDomain(id),
		);
		return new RoomList({
			activeRoom: initialRoom,
			rooms,
		});
	}
}
