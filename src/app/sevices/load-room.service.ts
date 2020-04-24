import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Room} from '../../models/room';
import {EquipmentDTO} from '../../models/equipmentDTO';
import {EquipmentPartitionService} from './equipment-partition.service';
import {RoomsDTO} from '../../models/roomsDTO';

@Injectable({
    providedIn: 'root',
})
export class LoadRoomService {
    constructor(
        private readonly http: HttpClient,
        private readonly equipmentPartition: EquipmentPartitionService,
    ) {}

    loadRoom(): Observable<Room[]> {
        return this.http.get<RoomsDTO>(`assets/db.json`).pipe(
            map((rooms: RoomsDTO) =>
                Object.entries(rooms).map(
                    (
                        [roomName, equipment]: [keyof RoomsDTO, RoomsDTO[keyof RoomsDTO]],
                        index,
                    ) => {
                        equipment = this.withoutName(equipment);

                        return {
                            id: index,
                            roomName,
                            equipment: this.equipmentPartition.partition(equipment),
                        } as Room;
                    },
                ),
            ),
        );
    }

    withoutName(equipment: EquipmentDTO): EquipmentDTO {
        Object.defineProperty(equipment, 'r_name', {
            enumerable: false,
        });

        return equipment;
    }
}
