import { Injectable } from '@angular/core';
import {IEquipmentDTO} from '../../models/iequipmentDTO';
import {IEquipment} from '../../models/iequipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentPartitionService {

  constructor() { }

  partition(equipment: IEquipmentDTO): IEquipment[] {
    // array of array of 3 elems : name of equip, key of props, value of props
    // какое устройство, какое его поле, какое занчение поля
    const slices = Object.entries(equipment).map(([key, value]: [string, string]) => [
      key.slice(2),
      key.slice(0, 1),
      value,
    ]);

    const equipmentRestruct = [];

    slices.forEach(([key, prop, value]: [string, string, string], index) => {
      let ind = equipmentRestruct.findIndex(item => item.id === key);

      const newProp = this.switcherProp(prop);

      if (ind !== -1) {
        equipmentRestruct[ind][newProp] = value;
      } else {
        equipmentRestruct.push({id: key, [newProp]: value});
        ind = equipmentRestruct.length - 1;
      }

      if (prop === 's' || prop === 'd') {
        equipmentRestruct[ind].group = this.getGroup(prop);
      }

      equipmentRestruct[ind].type = this.getType(key);
    });
    equipmentRestruct.forEach(item => {
      item.name = item.name || `${item.id
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

    return equipmentRestruct as IEquipment[]; // массив объектов каждый из которых устройство
    // а его поля это его свойства
  }

  private getGroup(property: string) {
    const switcher = {
      s: 'sensor',
      d: 'device',
    };
    return switcher[property];
  }

  private getType(key: string) {
    const switcher = {
      humi: 'humidity',
      temp: 'temperature',
      'co2-': 'co2',
      kett: 'kettle',
      toas: 'toaster',
    };
    return switcher[key.slice(0, 4)];
  }

  private switcherProp(property: string) {
    const switcher = {
      s: 'value',
      d: 'value',
      m: 'mac',
      u: 'update',
      r: 'nameOfRoom',
      n: 'name'
    };
    return switcher[property];
  }
}
