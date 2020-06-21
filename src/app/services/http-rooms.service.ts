import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RoomList, RoomListDTO } from '@models/room-list';
import { Room, RoomDTO, RoomDTOProps } from '@models/room';
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

	public patchHardware(hardware: Hardware, roomId: Room['id']): Observable<Hardware> {
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

	public patchEquipment(
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

	public patchRoom(room: Room): Observable<Room> {
		return this.http
			.put<RoomDTOProps>(
				`${FIREBASE_DATABASE_URL}/users/user_id/rooms/${room.id}/.json`,
				Room.createDTO(room),
			)
			.pipe(map((roomDTO) => new RoomDTO({ ...roomDTO }).createDomain(room.id, room)));
	}

	public postRoom(room: Room): Observable<Room> {
		return this.http
			.post<{ name: string }>(
				`${FIREBASE_DATABASE_URL}/users/user_id/rooms.json`,
				Room.createDTO(room),
			)
			.pipe(
				tap((z) => {
					console.log(z);
				}),
				map((response) => new Room({ ...room, id: response.name })),
			);
	}

	public deleteRoom(room: Room): Observable<{ room: Room; response: null }> {
		return this.http
			.delete<null>(`${FIREBASE_DATABASE_URL}/users/user_id/rooms/${room.id}.json`)
			.pipe(map((response) => ({ room, response })));
	}

	public patchRoomList(roomList: RoomList): Observable<RoomList> {
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
