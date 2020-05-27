import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EquipmentPartitionService } from './equipment-partition.service';
import { environment } from '../../environments/environment';
import { RoomCollection, RoomList, RoomListDTO } from '@models/rooms';
import { Room, RoomDTO } from '@models/room';

const FIREBASE_DATABASE_URL = environment.firebaseConfig.databaseURL;

@Injectable()
export class HttpRoomsService {
	constructor(
		private readonly http: HttpClient,
		private readonly equipmentPartition: EquipmentPartitionService,
	) {}

	public loadRoomsDTO(): Observable<RoomCollection> {
		return this.http.get<RoomCollection>(`${FIREBASE_DATABASE_URL}/.json`);
	}

	public loadRooms(): Observable<RoomList> {
		return this.http
			.get<RoomCollection>(`${FIREBASE_DATABASE_URL}/.json`)
			.pipe(
				map((roomCollection: RoomCollection) =>
					new RoomListDTO({ roomCollection }).createDomain(),
				),
			);
	}

	public loadRoomList(): Observable<RoomList> {
		return this.http
			.get<RoomCollection>(`${FIREBASE_DATABASE_URL}/.json`)
			.pipe(
				map((roomCollection: RoomCollection) =>
					new RoomListDTO({ roomCollection }).createDomain(),
				),
			);
	}

	public postRoomList(roomList: RoomList): Observable<RoomList> {
		return this.http
			.put<RoomCollection>(`${FIREBASE_DATABASE_URL}/.json`, roomList.createRoomCollection())
			.pipe(map((roomCollection) => new RoomListDTO({ roomCollection }).createDomain()));
	}

	public postRooms(roomsDTO: RoomCollection): Observable<Room[]> {
		const roomsDTOcopy = { ...roomsDTO };

		return this.http.put<RoomCollection>(`${FIREBASE_DATABASE_URL}/.json`, roomsDTOcopy).pipe(
			map((rooms: RoomCollection) =>
				Object.entries(rooms).map(
					([roomName, roomDTO]: [keyof RoomCollection, RoomDTO], id) => {
						return {
							roomName,
							id,
							equipment: this.equipmentPartition.partition(roomDTO),
						} as Room;
					},
				),
			),
		);
	}
}
