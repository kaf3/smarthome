import { Room } from '../room/room';
import { RoomDTO } from '@models/room';
import { Collection, OmitByPropType } from '@models/common';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export type RoomListProps = OmitByPropType<RoomList, Function>;

export class RoomList {
	public readonly rooms: Room[];
	public readonly activeRoom: Room;

	constructor(source: RoomList | RoomListProps) {
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

	private static readonly adapter: EntityAdapter<Room> = createEntityAdapter<Room>({
		selectId: (room) => room.id ?? '',
		sortComparer: false,
	});

	private static createEntityState(roomList: RoomList): EntityState<Room> {
		return this.adapter.addAll(roomList.rooms, this.adapter.getInitialState());
	}

	public static updateManyRooms(roomList: RoomList, rooms: Room[]): RoomList {
		let entityRoom: EntityState<Room> = this.createEntityState(roomList);
		entityRoom = this.adapter.upsertMany(rooms, entityRoom);
		return new RoomList({
			...roomList,
			rooms: Object.values(entityRoom.entities as { [s: string]: Room }),
		});
	}

	public static updateRoom(roomList: RoomList, room: Room): RoomList {
		let entityRoom: EntityState<Room> = this.createEntityState(roomList);
		entityRoom = this.adapter.upsertOne(room, entityRoom);
		return new RoomList({
			...roomList,
			rooms: Object.values(entityRoom.entities as { [s: string]: Room }),
		});
	}

	public static getRoom(id: Room['id'], roomList?: RoomList): Room | undefined {
		if (roomList) {
			return this.createEntityState(roomList).entities[id ?? ''];
		}
		return undefined;
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
			activeRoom: oldRoomList?.activeRoom ?? rooms[0], //when you open roomlist firstly
			rooms,
		});
	}
}
