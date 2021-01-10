import { BaseDomain, OmitByPropType } from '@models/common';
import { createDictionary, toDomainDictionary, toDTODictionary } from '@helpers';
import { Hardware } from '@models/hardware';
import { Room } from '../room';

export type EquipmentComponentSize = 'small' | 'large' | 'expand';

export interface AdditionalEquipmentVal {
	value: Equipment['value'];
	type: string;
	unit: string;
	editable: boolean;
	step?: number;
	range?: number[];
}

export enum EquipmentGroup {
	SENSOR = 'sensor',
	DEVICE = 'device',
}

export enum EquipmentType {
	TEMPERATURE = 'температура',
	CO2 = 'co2',
	HUMIDITY = 'влажность',
	CURRENT = 'ток',
	VOLTAGE = 'напряжение',
	USERTYPE = 'пользовательский тип',
	BRIGHTNESS = 'яркость',
	SWITCHER = 'выключатель',
	POWER = 'мощность',
	PHOTODETECTOR = 'освещенность',
}

export enum EquipmentDTOType {
	TEMPERATURE = 'temp',
	CO2 = 'co2-',
	HUMIDITY = 'humi',
	CURRENT = 'curr',
	VOLTAGE = 'volt',
	USERTYPE = 'user',
	BRIGHTNESS = 'brightness',
	SWITCHER = 'switcher',
	POWER = 'powe',
	PHOTODETECTOR = 'photoDetector',
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

// ////make inheritance

export type EquipmentDTOProps = OmitByPropType<EquipmentDTO, Function>;

export class EquipmentDTO {
	public readonly name: string;

	public readonly group: string | null;

	public readonly type: string | null;

	public readonly status: boolean;

	public readonly value: boolean | string | number | null;

	public readonly additionalValues?: AdditionalEquipmentVal[];

	public createDomain: (id: Equipment['id'], oldEquipment?: Equipment) => Equipment;

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

export class Equipment extends BaseDomain {
	public readonly value: string | number | boolean | null;

	public readonly additionalValues?: AdditionalEquipmentVal[];

	public readonly type: string | null;

	public readonly group: string | null;

	public readonly status: boolean;

	constructor(source: Equipment | EquipmentProps) {
		super(source.id, source.name);
		this.group = source.group;
		this.status = source.status;
		this.value = source.value;
		this.type = source.type;
		this.additionalValues = source.additionalValues;
	}

	public static setValue(equipment: Equipment, val?: Equipment['value']): Equipment {
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
			type: this.convertToDTOType[equipment.type ?? ''],
			group: equipment.group,
			additionalValues: equipment.additionalValues,
		});
	}

	static readonly initial = new Equipment({
		...BaseDomain.initial,
		group: null,
		status: false,
		value: null,
		type: null,
		additionalValues: undefined,
	});

	static readonly convertToDTOType = toDTODictionary(equipmentTypeDictionary);
}

EquipmentDTO.prototype.createDomain = function (
	id: Equipment['id'],
	_oldEquipment?: Equipment,
): Equipment {
	return new Equipment({
		name: this.name,
		type: EquipmentDTO.convertToDomainType[this.type ?? ''],
		group: this.group,
		status: this.status,
		value: this.value,
		id,
		additionalValues: this.additionalValues,
	});
};

export abstract class EquipmentComponentInputs {
	room: Room;

	equipment: Equipment;

	hardware: Hardware;

	size: EquipmentComponentSize;
}
