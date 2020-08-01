import { RoomDTO } from '@models/room';
import { Collection, OmitByPropType } from '@models/common';
import { Room } from '../room/room';
import { createEntityAdapter, Dictionary, EntityState } from '@ngrx/entity';

export type RoomListProps = OmitByPropType<RoomList, Function>;

// const RoomListWithChildren: HostConstructor<RoomList, Room, typeof Empty> = host<
// 	RoomList,
// 	Room,
// 	'rooms'
// >('rooms');

export class RoomList {
	public readonly roomEntityState: EntityState<Room>;
	public readonly activeRoom: Room;

	constructor(source: RoomList | RoomListProps) {
		this.activeRoom = source.activeRoom;
		this.roomEntityState = { ...source.roomEntityState };
	}

	static adapter = createEntityAdapter<Room>({
		sortComparer: false,
		selectId: (r) => r.id ?? '',
	});

	static initial: RoomList = {
		activeRoom: Room.initial,
		roomEntityState: RoomList.adapter.getInitialState(),
	};

	public static createRoomCollection(roomList: RoomList): Dictionary<RoomDTO> {
		/*		const roomMap = new Map<keyof Collection<RoomDTO>, RoomDTO>();
		roomList.rooms.forEach((room) => {
			roomMap.set(room.id ?? '', Room.createDTO(room));
		});
		return Object.fromEntries(roomMap);*/
		const roomCollection: Dictionary<RoomDTO> = {};
		Object.entries(roomList.roomEntityState.entities).forEach(
			([id, room]) => (roomCollection[id] = Room.createDTO(room ?? Room.initial)),
		);
		return roomCollection;
	}

	public static updateManyRooms(roomList: RoomList, rooms: Room[]): RoomList {
		return new RoomList({
			...roomList,
			roomEntityState: RoomList.adapter.upsertMany(rooms, roomList.roomEntityState),
		});
		//return super.updateManyChild(roomList, rooms);
	}

	public static updateOneRoom(roomList: RoomList, room: Room): RoomList {
		return new RoomList({
			...roomList,
			roomEntityState: RoomList.adapter.upsertOne(room, roomList.roomEntityState),
		});
	}

	public static addRoom(roomList: RoomList, room: Room): RoomList {
		return new RoomList({
			...roomList,
			roomEntityState: RoomList.adapter.addOne(room, roomList.roomEntityState),
		});
	}

	public static removeOneRoom(roomList: RoomList, room: Room): RoomList {
		return new RoomList({
			...roomList,
			roomEntityState: RoomList.adapter.removeOne(room.id ?? '', roomList.roomEntityState),
		});
	}

	public static getRoom(id: Room['id'], roomList?: RoomList): Room | undefined {
		return roomList?.roomEntityState.entities[id ?? ''];
	}
}

export type RoomListDTOProps = OmitByPropType<RoomListDTO, Function>;

export class RoomListDTO {
	public readonly roomCollection: Collection<RoomDTO>;

	constructor(source: RoomListDTO | RoomListDTOProps) {
		this.roomCollection = { ...source.roomCollection };
	}

	public createDomain(oldRoomList?: RoomList): RoomList {
		/*		const rooms = Object.entries(this.roomCollection).map(([id, roomDTO]) =>
			new RoomDTO({ ...roomDTO }).createDomain(id, RoomList.getRoom(id, oldRoomList)),
		);

		return new RoomList({
			activeRoom: oldRoomList?.activeRoom ?? rooms[0], // when you open roomList firstly
			rooms,
		});*/
		const ids: RoomList['roomEntityState']['ids'] = [];
		const entries = Object.entries(this.roomCollection).map(([id, roomDTO]) => {
			(ids as string[]).push(id);
			return [
				id,
				new RoomDTO({ ...roomDTO }).createDomain(
					id,
					oldRoomList?.roomEntityState.entities[id],
				),
			];
		});

		return new RoomList({
			roomEntityState: { ids, entities: Object.fromEntries(entries) },
			activeRoom: oldRoomList?.activeRoom ?? (entries[0][1] as Room),
		});
	}
}
