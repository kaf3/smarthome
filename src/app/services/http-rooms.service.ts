import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RoomList, RoomListDTO } from '@models/room-list';
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
		return this.http
			.put<HardwareDTOProps>(
				`${FIREBASE_DATABASE_URL}/users/user_id/rooms/${roomId}/hardwareCollection/${hardware.id}/.json`,
				Hardware.createDTO(hardware),
			)
			.pipe(
				map((hardwareDTO) =>
					new HardwareDTO({ ...hardwareDTO }).createDomain(hardware.id, hardware),
				),
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
		return this.http
			.put<Collection<RoomDTO>>(
				`${FIREBASE_DATABASE_URL}/users/user_id/rooms/.json`,
				RoomList.createRoomCollection(roomList),
			)
			.pipe(
				map((roomCollection) => {
					return new RoomListDTO({ roomCollection }).createDomain(roomList);
				}),
			);
	}
}
