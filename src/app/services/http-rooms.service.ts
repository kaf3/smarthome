import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Room} from '../models/room';
import {RoomDTO} from '../models/roomDTO';
import {EquipmentPartitionService} from './equipment-partition.service';
import {RoomsDTO} from '../models/roomsDTO';
import {environment} from '../../environments/environment';

const FIREBASE_DATABASE_URL = environment.firebaseConfig.databaseURL;

@Injectable({
    providedIn: 'root',
})
export class HttpRoomsService {
    constructor(
        private readonly http: HttpClient,
        private readonly equipmentPartition: EquipmentPartitionService,
    ) {}
    public loadRoomsDTO(): Observable<RoomsDTO> {
        return this.http.get<RoomsDTO>(`${FIREBASE_DATABASE_URL}/.json`);
    }

    public loadRooms(): Observable<Room[]> {
        return this.http.get<RoomsDTO>(`${FIREBASE_DATABASE_URL}/.json`).pipe(
            map((rooms: RoomsDTO) =>
                Object.entries(rooms).map(
                    (
                        [roomName, roomDTO]: [keyof RoomsDTO, RoomsDTO[keyof RoomsDTO]],
                        index,
                    ) => {
                        return {
                            roomName,
                            equipment: this.equipmentPartition.partition(roomDTO),
                        } as Room;
                    },
                ),
            ),
        );
    }

    public patchRoom(roomName: RoomDTO['r_name'], roomDTO: RoomDTO): Observable<Room> {
        const roomDTOcopy = {...roomDTO};

        return this.http
            .patch<RoomsDTO>(`${FIREBASE_DATABASE_URL}/.json`, {
                [roomName]: roomDTOcopy,
            })
            .pipe(
                map((roomsDTO: RoomsDTO) => {
                    const roomDTO = roomsDTO[roomName];

                    return {
                        roomName,
                        equipment: this.equipmentPartition.partition(roomDTO),
                    } as Room;
                }),
            );
    }

    public postRooms(roomsDTO: RoomsDTO): Observable<Room[]> {
        const roomsDTOcopy = {...roomsDTO};

        return this.http
            .put<RoomsDTO>(`${FIREBASE_DATABASE_URL}/.json`, roomsDTOcopy)
            .pipe(
                map((rooms: RoomsDTO) =>
                    Object.entries(rooms).map(
                        ([roomName, roomDTO]: [keyof RoomsDTO, RoomDTO]) => {
                            return {
                                roomName,
                                equipment: this.equipmentPartition.partition(roomDTO),
                            } as Room;
                        },
                    ),
                ),
            );
    }
}
