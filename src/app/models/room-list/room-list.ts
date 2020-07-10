import { RoomDTO } from '@models/room';
import { Collection, Empty, host, HostConstructor, OmitByPropType } from '@models/common';
import { Room } from '../room/room';

export type RoomListProps = OmitByPropType<RoomList, Function>;

const RoomListWithChildren: HostConstructor<RoomList, Room, typeof Empty> = host<
	RoomList,
	Room,
	'rooms'
>('rooms');

export class RoomList extends RoomListWithChildren {
	public readonly rooms: Room[];

	public readonly activeRoom: Room;

	constructor(source: RoomList | RoomListProps) {
		super();
		this.rooms = source.rooms;
		this.activeRoom = source.activeRoom;
	}

	public static createRoomCollection(roomList: RoomList): Collection<RoomDTO> {
		const roomMap = new Map<keyof Collection<RoomDTO>, RoomDTO>();
		roomList.rooms.forEach((room) => {
			roomMap.set(room.id ?? '', Room.createDTO(room));
		});
		return Object.fromEntries(roomMap);
	}

	public static updateManyRooms(roomList: RoomList, rooms: Room[]): RoomList {
		return super.updateManyChild(roomList, rooms);
	}

	public static getRoom(id: Room['id'], roomList?: RoomList): Room | undefined {
		return super.getChild(id, roomList);
	}
}

export type RoomListDTOProps = OmitByPropType<RoomListDTO, Function>;

export class RoomListDTO {
	public readonly roomCollection: Collection<RoomDTO>;

	constructor(source: RoomListDTO | RoomListDTOProps) {
		this.roomCollection = { ...source.roomCollection };
	}

	public createDomain(oldRoomList?: RoomList): RoomList {
		const rooms = Object.entries(this.roomCollection).map(([id, roomDTO]) =>
			new RoomDTO({ ...roomDTO }).createDomain(id, RoomList.getRoom(id, oldRoomList)),
		);

		return new RoomList({
			activeRoom: oldRoomList?.activeRoom ?? rooms[0], // when you open roomlist firstly
			rooms,
		});
	}
}
