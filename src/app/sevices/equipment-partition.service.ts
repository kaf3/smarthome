import {Injectable} from '@angular/core';
import {EquipmentDTO} from '../../models/equipmentDTO';
import {Equipment} from '../../models/equipment';

export type EquipmentId = string;
export type EquipmentProp = string;
export type EquipmentValueProp = string;

@Injectable({
    providedIn: 'root',
})
export class EquipmentPartitionService {
    constructor() {}

    partition(equipment: EquipmentDTO): Equipment[] {
        // array of array of 3 elems : name of equip, key of props, value of props
        // какое устройство, какое его поле, какое значение поля
        const slices: [EquipmentId, EquipmentProp, EquipmentValueProp][] = Object.entries(
            equipment,
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
            item.name =
                item.name ||
                `${item.id
                    .slice(5)
                    .split('_')
                    .join(' ')} (${item.type})`;
            item.location = equipment.r_name;

            Object.defineProperty(item, 'location', {
                enumerable: false,
            });

            Object.defineProperty(item, 'id', {
                enumerable: false,
            });
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
