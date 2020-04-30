import {Injectable} from '@angular/core';
import {RoomDTO} from '@models';
import {Equipment} from '@models';

export type EquipmentId = string;
export type EquipmentProp = string;
export type EquipmentValueProp = string;

@Injectable({
    providedIn: 'root',
})
export class EquipmentPartitionService {
    constructor() {}

    public withoutName(roomDTO: RoomDTO): RoomDTO {
        Object.defineProperty(roomDTO, 'r_name', {
            enumerable: false,
        });

        return roomDTO;
    }

    public partition(roomDTO: RoomDTO): Equipment[] {
        // array of array of 3 elems : name of equip, key of props, value of props
        // какое устройство, какое его поле, какое значение поля
        const slices: [EquipmentId, EquipmentProp, EquipmentValueProp][] = Object.entries(
            roomDTO,
        ).map(([key, value]: [string, string]) => [key.slice(2), key.slice(0, 1), value]);

        const equipmentAccumulator = [];

        slices.forEach(
            (
                [equipmentId, prop, value]: [
                    EquipmentId,
                    EquipmentProp,
                    EquipmentValueProp,
                ],
                index,
            ) => {
                let ind = equipmentAccumulator.findIndex(item => item.id === equipmentId);

                const newProp = EquipmentPartitionService.getPropertyName(prop);

                if (ind !== -1) {
                    equipmentAccumulator[ind][newProp] = value;
                } else {
                    equipmentAccumulator.push({id: equipmentId, [newProp]: value});
                    ind = equipmentAccumulator.length - 1;
                }

                if (prop === 's' || prop === 'd') {
                    equipmentAccumulator[ind].group = EquipmentPartitionService.getGroup(
                        prop,
                    );
                }

                equipmentAccumulator[ind].type = EquipmentPartitionService.getType(
                    equipmentId,
                );
            },
        );
        equipmentAccumulator.forEach(item => {
            item.name = item.name || `${item.type} (${item.id.slice(5)})`;
            item.location = roomDTO.r_name;
        });

        return equipmentAccumulator as Equipment[]; // массив объектов каждый из которых устройство
        // а его поля это его свойства
    }

    private static getGroup(property: 's' | 'd'): Equipment['group'] {
        const switcher = {
            s: 'sensor',
            d: 'device',
        };

        return switcher[property];
    }

    private static getType(key: string): Equipment['type'] {
        const switcher = {
            humi: 'humidity',
            temp: 'temperature',
            'co2-': 'co2',
            kett: 'kettle',
            toas: 'toaster',
        };

        return switcher[key.slice(0, 4)];
    }

    private static getPropertyName(property: string): keyof Equipment {
        const switcher = {
            s: 'value',
            d: 'value',
            m: 'mac',
            u: 'update',
            r: 'nameOfRoom',
            n: 'name',
        };

        return switcher[property];
    }
}
