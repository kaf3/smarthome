import { EquipmentDTO } from '@models/equipment/equipmentDTO';

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
	ACTIVITY = 'activity', //special for devices
	USERTYPE = 'userType',
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

export interface IEquipment {
	readonly name: string;
	readonly value: string | number | boolean | null;
	readonly type: string | null;
	readonly group: string | null;
	readonly id: string | null;
	readonly status: boolean;
}

export class Equipment implements IEquipment {
	public readonly name: string;
	public readonly value: string | number | boolean | null;
	public readonly type: string | null;
	public readonly group: string | null;
	public readonly id: string | null;
	public readonly status: boolean;

	constructor(source: IEquipment | Equipment) {
		this.name = source.name;
		this.group = source.group;
		this.id = source.id;
		this.status = source.status;
		this.value = source.value;
		this.type = source.type;
	}

	public createDTO(): EquipmentDTO {
		return new EquipmentDTO({
			name: this.name,
			value: this.value,
			status: this.status,
			type: this.type,
			group: this.group,
		});
	}
}

export const initialEquipment = new Equipment({
	name: '',
	group: null,
	id: null,
	status: false,
	value: null,
	type: null,
});
