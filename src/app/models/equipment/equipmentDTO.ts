import { Equipment } from '@models/equipment/equipment';

interface IEquipmentDTO {
	readonly name: string;
	readonly group: string;
	readonly type: string;
	readonly status: boolean;
	readonly value: boolean | string | number;
}

export class EquipmentDTO implements IEquipmentDTO {
	public readonly name: string;
	public readonly group: string;
	public readonly type: string;
	public readonly status: boolean;
	public readonly value: boolean | string | number;
	constructor(source: EquipmentDTO | IEquipmentDTO) {
		this.name = source.name;
		this.group = source.group;
		this.type = source.type;
		this.status = source.status;
		this.value = source.value;
	}

	public createDomain(id: Equipment['id']): Equipment {
		return new Equipment({
			name: this.name,
			type: this.type,
			group: this.group,
			status: this.status,
			value: this.value,
			id,
		});
	}
}
