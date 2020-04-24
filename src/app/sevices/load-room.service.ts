import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IRoom} from '../../models/iroom';
import {IEquipmentDTO} from '../../models/iequipmentDTO';
import {EquipmentPartitionService} from './equipment-partition.service';
import {IRoomsDTO} from '../../models/iroomsDTO';

@Injectable({
    providedIn: 'root',
})
export class LoadRoomService {
    constructor(
        private readonly http: HttpClient,
        private readonly equipmentPartion: EquipmentPartitionService,
    ) {}

    loadRoom(): Observable<IRoom[]> {
        return this.http.get<IRoomsDTO>(`assets/db.json`).pipe(
            map((rooms: IRoomsDTO) =>
                Object.entries(rooms).map(
                    (
                        [roomName, equipment]: [
                            keyof IRoomsDTO,
                            IRoomsDTO[keyof IRoomsDTO],
                        ],
                        index,
                    ) => {
                        equipment = this.withoutName(equipment);

                        return {
                            id: index,
                            roomName,
                            equipment: this.equipmentPartion.partition(equipment),
                        } as IRoom;
                    },
                ),
            ),
        );
    }

    withoutName(equipment: IEquipmentDTO): IEquipmentDTO {
        Object.defineProperty(equipment, 'r_name', {
            enumerable: false,
        });

        return equipment;
    }
}
