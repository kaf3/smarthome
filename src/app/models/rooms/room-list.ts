import { Room } from '../room/room';
import { RoomCollection } from '@models/rooms/roomsDTO';
import { EquipmentDTO } from '@models/equipment';
import { EquipmentCollectionDTO, HardwareDTO } from '@models/hardware';
import { HardwareCollectionDTO, RoomDTO } from '@models/room';

interface IRoomList {
	readonly rooms: Room[];
	readonly activeRoom: Room;
}

export class RoomList implements IRoomList {
	public readonly rooms: Room[];
	public readonly activeRoom: Room;

	constructor(source: RoomList | IRoomList) {
		this.rooms = source.rooms;
		this.activeRoom = source.activeRoom;
	}

	public createRoomCollection(): RoomCollection {
		const roomMap = new Map<keyof RoomCollection, RoomDTO>();
		this.rooms.forEach((room) => {
			const hardwareMap = new Map<keyof HardwareCollectionDTO, HardwareDTO>();
			room.hardwares.forEach((hardware) => {
				const equipmentMap = new Map<keyof EquipmentCollectionDTO, EquipmentDTO>();
				hardware.equipments.forEach((equipment) => {
					const equipmentDTO = equipment.createDTO();
					equipmentMap.set(equipment.id, equipmentDTO);
				});
				const hardwareDTO = hardware.createDTO(Object.fromEntries(equipmentMap));
				hardwareMap.set(hardware.id, hardwareDTO);
			});
			const roomDTO = room.createDTO(Object.fromEntries(hardwareMap));
			roomMap.set(room.id, roomDTO);
		});
		return Object.fromEntries(roomMap);
	}
}
