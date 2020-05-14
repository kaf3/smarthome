import { Room } from './room';

export class RoomList {
	public readonly rooms: Room[];
	public readonly activeRoom: Room;

	constructor(source: RoomList) {
		this.rooms = source.rooms;
		this.activeRoom = source.activeRoom;
	}
}
