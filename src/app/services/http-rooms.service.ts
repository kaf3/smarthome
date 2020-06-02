import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RoomList, RoomListDTO } from '@models/rooms';
import { Room, RoomDTO } from '@models/room';
import { Collection } from '@models/common';
import { Hardware, HardwareDTO, HardwareDTOProps } from '@models/hardware';
import { Equipment } from '@models/equipment';

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
				hardware.createDTO(),
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

	public postRoomList(roomList: RoomList): Observable<RoomList> {
		return this.http
			.put<Collection<RoomDTO>>(
				`${FIREBASE_DATABASE_URL}/.json`,
				roomList.createRoomCollection(),
			)
			.pipe(map((roomCollection) => new RoomListDTO({ roomCollection }).createDomain()));
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
