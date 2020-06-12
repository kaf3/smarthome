import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RoomList, RoomListDTO } from '@models/rooms';
import { Room, RoomDTO } from '@models/room';
import { Collection } from '@models/common';
import { Hardware, HardwareDTO, HardwareDTOProps } from '@models/hardware';
import { Equipment, EquipmentDTO, EquipmentDTOProps } from '@models/equipment';

const FIREBASE_DATABASE_URL = environment.firebaseConfig.databaseURL;

@Injectable()
export class HttpRoomsService {
	constructor(private readonly http: HttpClient) {}

	public loadRoomsDTO(): Observable<Collection<RoomDTO>> {
		return this.http.get<Collection<RoomDTO>>(
			`${FIREBASE_DATABASE_URL}/users/user_id/rooms.json`,
		);
	}

	public loadRooms(): Observable<RoomList> {
		return this.http
			.get<Collection<RoomDTO>>(`${FIREBASE_DATABASE_URL}/.json`)
			.pipe(
				map((roomCollection: Collection<RoomDTO>) =>
					new RoomListDTO({ roomCollection }).createDomain(),
				),
			);
	}

	public loadRoomList(): Observable<RoomList> {
		return this.http
			.get<Collection<RoomDTO>>(`${FIREBASE_DATABASE_URL}/users/user_id/rooms.json`)
			.pipe(
				map((roomCollection: Collection<RoomDTO>) => {
					return new RoomListDTO({ roomCollection }).createDomain();
				}),
			);
	}

	public postHardware(hardware: Hardware, roomId: Room['id']): Observable<Hardware> {
		const cashedActiveEquipment = new Equipment({
			...hardware.activeEquipment,
			value: hardware.activeEquipment.value,
		});
		return this.http
			.put<HardwareDTOProps>(
				`${FIREBASE_DATABASE_URL}/users/user_id/rooms/${roomId}/hardwareCollection/${hardware.id}/.json`,
				Hardware.createDTO(hardware),
			)
			.pipe(
				map((hardwareDTO) => {
					const newHardware = new HardwareDTO({ ...hardwareDTO }).createDomain(
						hardware.id,
					);
					if (
						!!newHardware.equipments.find((eqp) => eqp.id === cashedActiveEquipment.id)
					) {
						newHardware.activeEquipment = cashedActiveEquipment;
					}
					return newHardware;
				}),
			);
	}

	public postEquipment(
		equipment: Equipment,
		hardwareId: Hardware['id'],
		roomId: Room['id'],
	): Observable<Equipment> {
		return this.http
			.put<EquipmentDTOProps>(
				`${FIREBASE_DATABASE_URL}/users/user_id/rooms/${roomId}/hardwareCollection/${hardwareId}/equipmentCollection/${equipment.id}/.json`,
				Equipment.createDTO(equipment),
			)
			.pipe(
				map((equipmentDTO) =>
					new EquipmentDTO({ ...equipmentDTO }).createDomain(equipment.id),
				),
			);
	}

	public postRoomList(roomList: RoomList): Observable<RoomList> {
		/*const cashedActiveRoom = roomList.activeRoom;
		const cashedActiveHardwares = new Map<Room['id'], Hardware>();
		const cashedActiveEquipments = new Map<Hardware['id'], Equipment>();
		roomList.rooms.forEach((room) => {
			cashedActiveHardwares.set(room.id, room.activeHardware);
			room.hardwares.forEach((hardware) =>
				cashedActiveEquipments.set(hardware.id, hardware.activeEquipment),
			);
		});*/
		return this.http
			.put<Collection<RoomDTO>>(
				`${FIREBASE_DATABASE_URL}/users/user_id/rooms/.json`,
				RoomList.createRoomCollection(roomList),
			)
			.pipe(
				map((roomCollection) => {
					return new RoomListDTO({ roomCollection }).createDomain();
				}),
			);
	}

	/*	public postRooms(roomsDTO: Collection<RoomDTO>): Observable<Room[]> {
		const roomsDTOcopy = { ...roomsDTO };

		return this.http.put<Collection<RoomDTO>>(`${FIREBASE_DATABASE_URL}/.json`, roomsDTOcopy).pipe(
			map((rooms: Collection<RoomDTO>) =>
				Object.entries(rooms).map(
					([roomName, roomDTO]: [keyof Collection<RoomDTO>, RoomDTO], id) => {
						return {
							roomName,
							id,
							equipment: this.equipmentPartition.partition(roomDTO),
						} as Room;
					},
				),
			),
		);
	}*/
}
