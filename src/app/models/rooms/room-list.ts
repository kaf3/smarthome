import { Room } from '../room/room';
import { RoomDTO } from '@models/room';
import { Collection, OmitByPropType } from '@models/common';

export type RoomListProps = OmitByPropType<RoomList, Function>;

export class RoomList {
	public readonly rooms: Room[];
	public readonly activeRoom: Room;

	constructor(source: RoomList | RoomListProps) {
		this.rooms = source.rooms;
		this.activeRoom = source.activeRoom;
	}

	public createRoomCollection(): Collection<RoomDTO> {
		const roomMap = new Map<keyof Collection<RoomDTO>, RoomDTO>();
		/*		this.rooms.forEach((room) => {
			const hardwareMap = new Map<keyof Collection<HardwareDTO>, HardwareDTO>();
			room.hardwares.forEach((hardware) => {
				const equipmentMap = new Map<keyof Collection<EquipmentDTO>, EquipmentDTO>();
				hardware.equipments.forEach((equipment) => {
					const equipmentDTO = equipment.createDTO();
					equipmentMap.set(equipment.id, equipmentDTO);
				});
				const hardwareDTO = hardware.createDTO(Object.fromEntries(equipmentMap));
				hardwareMap.set(hardware.id, hardwareDTO);
			});
			const roomDTO = room.createDTO(Object.fromEntries(hardwareMap));
			roomMap.set(room.id, roomDTO);
		});*/
		return Object.fromEntries(roomMap);
	}
}

export type RoomListDTOProps = OmitByPropType<RoomListDTO, Function>;

export class RoomListDTO {
	public readonly roomCollection: Collection<RoomDTO>;

	constructor(source: RoomListDTO | RoomListDTOProps) {
		this.roomCollection = { ...source.roomCollection };
	}

	public createDomain(): RoomList {
		const rooms = Object.entries(this.roomCollection).map(([id, roomDTO]) =>
			new RoomDTO({ ...roomDTO }).createDomain(id),
		);

		return new RoomList({
			activeRoom: rooms[0], //when you open roomlist firstly
			rooms,
		});
	}
}
