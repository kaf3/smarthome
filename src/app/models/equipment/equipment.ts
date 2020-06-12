import { OmitByPropType } from '@models/common';
import { createDictionary, toDomainDictionary, toDTODictionary } from '@helpers';

export enum EquipmentGroup {
	SENSOR = 'sensor',
	DEVICE = 'device',
}

export enum EquipmentType {
	TEMPERATURE = 'temperature',
	CO2 = 'co2',
	HUMIDITY = 'humidity',
	CURRENT = 'current',
	VOLTAGE = 'voltage',
	USERTYPE = 'userType',
}

export enum EquipmentDTOType {
	TEMPERATURE = 'temp',
	CO2 = 'co2-',
	HUMIDITY = 'humi',
	CURRENT = 'curr',
	VOLTAGE = 'volt',
	USERTYPE = 'user',
}

export enum Activity {
	ON = 'on',
	OFF = 'off',
}

export enum Status {
	PENDING = 'pending',
	ENABLED = 'enabled',
	DISABLED = 'disabled',
}

export const equipmentTypeDictionary = createDictionary(EquipmentDTOType, EquipmentType);

//////make inheritance

export type EquipmentDTOProps = OmitByPropType<EquipmentDTO, Function>;

export class EquipmentDTO {
	public readonly name: string;
	public readonly group: string;
	public readonly type: string;
	public readonly status: boolean;
	public readonly value: boolean | string | number;
	public createDomain: (id: Equipment['id']) => Equipment;

	constructor(source: EquipmentDTO | EquipmentDTOProps) {
		this.name = source.name;
		this.group = source.group;
		this.type = source.type;
		this.status = source.status;
		this.value = source.value;
	}

	static convertToDomainType = toDomainDictionary(equipmentTypeDictionary);
}

type EquipmentProps = OmitByPropType<Equipment, Function>;

export class Equipment {
	public name: string;
	public readonly value: string | number | boolean | null;
	public readonly type: string | null;
	public readonly group: string | null;
	public readonly id: string | null;
	public readonly status: boolean;

	constructor(source: Equipment | EquipmentProps) {
		this.name = source.name;
		this.group = source.group;
		this.id = source.id;
		this.status = source.status;
		this.value = source.value;
		this.type = source.type;
	}

	public static setValue(equipment: Equipment, val: Equipment['value']): Equipment {
		if (equipment.group === EquipmentGroup.DEVICE && val !== null && val !== undefined) {
			return new Equipment({ ...equipment, value: val });
		}
		return new Equipment({ ...equipment });
	}

	public static createDTO(equipment: Equipment): EquipmentDTO {
		return new EquipmentDTO({
			name: equipment.name,
			value: equipment.value,
			status: equipment.status,
			type: this.convertToDTOType[equipment.type],
			group: equipment.group,
		});
	}

	static readonly initial = new Equipment({
		name: '',
		group: null,
		id: null,
		status: false,
		value: null,
		type: null,
	});

	static readonly convertToDTOType = toDTODictionary(equipmentTypeDictionary);
}

EquipmentDTO.prototype.createDomain = function (id: Equipment['id']): Equipment {
	return new Equipment({
		name: this.name,
		type: EquipmentDTO.convertToDomainType[this.type],
		group: this.group,
		status: this.status,
		value: this.value,
		id,
	});
};
