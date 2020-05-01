import {Pipe, PipeTransform} from '@angular/core';
import {Activity, Equipment, EquipmentGroup, EquipmentType} from '@models';

@Pipe({
    name: 'unit',
})
export class UnitPipe implements PipeTransform {
    transform(value: Equipment['value'], equipment: Equipment): string {
        if (equipment.group === EquipmentGroup.DEVICE) {
            return value ? Activity.ON : Activity.OFF;
        }

        switch (equipment.type) {
            case EquipmentType.ACTIVITY: {
                return value ? Activity.ON : Activity.OFF;
            }
            case EquipmentType.TEMPERATURE:
                return value + '\xB0C.';
            case EquipmentType.CO2:
            case EquipmentType.HUMIDITY:
                return value + '%';
            case EquipmentType.VOLTAGE:
                return value + 'V';
            case EquipmentType.CURRENT:
                return value + 'A';
            case EquipmentType.USERTYPE: //doesnt work
                return value + '';
            default:
                return value + '';
        }
    }
}
