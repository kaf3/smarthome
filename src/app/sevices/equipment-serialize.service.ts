import {Injectable} from '@angular/core';
import {Equipment} from '../../models/equipment';
import {EquipmentDTO} from '../../models/equipmentDTO';

@Injectable({
    providedIn: 'root',
})
export class EquipmentSerializeService {
    constructor() {}

    public serialize(equipment: Equipment): EquipmentDTO {
        let equipmentDTO: EquipmentDTO = {
            r_name: equipment.location,
        };
        const type = EquipmentSerializeService.getTypeDTO(equipment.type);
        const id = equipment.id;
        const group = EquipmentSerializeService.getGroupDTO(equipment.group);

        const body: string = type + '_' + id;

        let key: keyof EquipmentDTO = group + '_' + body;
        equipmentDTO[key] = equipment.value;
        key = 'n' + '_' + body;
        equipmentDTO[key] = equipment.name;
        key = 'u' + '_' + body;
        equipmentDTO[key] = equipment.update.toDateString();
        key = 'm' + '_' + body;
        equipmentDTO[key] = equipment.mac;

        return equipmentDTO;
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
