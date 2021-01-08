import { Pipe, PipeTransform } from '@angular/core';
import { Activity, Equipment, EquipmentType } from '@models/equipment';

@Pipe({
	name: 'unit',
})
export class UnitPipe implements PipeTransform {
	transform(value: Equipment['value'], equipment: Equipment): string {
		if (typeof value === 'boolean' || value === 'true' || value === 'false') {
			return value === 'true' || value ? Activity.ON : Activity.OFF;
		}

		switch (equipment.type) {
			case EquipmentType.TEMPERATURE:
				return `${value}\xB0C.`;
			case EquipmentType.CO2:
			case EquipmentType.HUMIDITY:
				return `${value}%`;
			case EquipmentType.VOLTAGE:
				return `${value}V`;
			case EquipmentType.CURRENT:
				return `${value}A`;
			case EquipmentType.USERTYPE: // doesnt work
				return `${value}`;
			case EquipmentType.BRIGHTNESS:
				return `${value}%`;
			case EquipmentType.SWITCHER:
				return value === 'true' || value === 1 || value === '1' || value
					? Activity.ON
					: Activity.OFF;
			default:
				return `${value}`;
		}
	}
}
