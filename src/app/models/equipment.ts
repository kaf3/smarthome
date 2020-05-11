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

export interface Equipment {
	name: string;
	mac?: string;
	value: string | number | boolean;
	type: string | null;
	group: string | null;
	update?: Date;
	id: string;
	location: string;
	working: boolean; ///doesnt work yet
	frequencyUpdating: number[]; ///doesnt work yet
}
