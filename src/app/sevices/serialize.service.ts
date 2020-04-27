import {Injectable} from '@angular/core';
import {Equipment} from '../../models/equipment';
import {RoomDTO} from '../../models/roomDTO';

@Injectable({
    providedIn: 'root',
})
export class SerializeService {
    constructor() {}

    public serializeEquipment(equipment: Equipment): RoomDTO {
        const equipmentDTO: RoomDTO = {
            r_name: equipment.location,
        };
        const type = SerializeService.getTypeDTO(equipment.type);
        const id = equipment.id;
        const group = SerializeService.getGroupDTO(equipment.group);

        const body: string = type + '_' + id;

        let key: keyof RoomDTO = group + '_' + body;

        equipmentDTO[key] = equipment.value;
        key = 'n' + '_' + body;
        equipmentDTO[key] = equipment.name;
        key = 'u' + '_' + body;
        equipmentDTO[key] = equipment.update ? equipment.update.toDateString() : '';
        key = 'm' + '_' + body;
        equipmentDTO[key] = equipment.mac;

        return equipmentDTO;
    }

    public serializeRoom(equipmentDTO: RoomDTO, roomDTO: RoomDTO): RoomDTO {
        return Object.assign(roomDTO, equipmentDTO);
    }

    private static getTypeDTO(key: Equipment['type']) {
        const switcher = {
            humidity: 'humi',
            temperature: 'temp',
            co2: 'co2-',
            kettle: 'kett',
            toaster: 'toas',
        };

        return switcher[key].slice(0, 4);
    }

    private static getGroupDTO(key: Equipment['group']) {
        const switcher = {
            sensor: 's',
            device: 'd',
        };

        return switcher[key][0];
    }
}
