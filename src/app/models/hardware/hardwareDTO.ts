import { EquipmentDTO } from '@models/equipment';
import { Hardware } from './hardware';

export interface EquipmentCollectionDTO {
	[equipmentId: string]: EquipmentDTO;
}

export interface IHardwareDTO {
	readonly mac: number | string;
	readonly name: string;
	readonly type: string;
	readonly numberOfEquip: number;
	readonly equipmentCollection: EquipmentCollectionDTO;
}

export class HardwareDTO implements IHardwareDTO {
	public readonly mac: number | string;
	public readonly name: string;
	public readonly type: string;
	public readonly numberOfEquip: number;
	public readonly equipmentCollection: EquipmentCollectionDTO;

	constructor(source: IHardwareDTO) {
		this.equipmentCollection = { ...source.equipmentCollection };
		this.mac = source.mac;
		this.name = source.name;
		this.type = source.type;
		this.numberOfEquip = source.numberOfEquip;
	}

	public createDomain(id: Hardware['id']): Hardware {
		const equipments = Object.entries(
			this.equipmentCollection,
		).map(([equipmentId, equipmentDTO]) => equipmentDTO.createDomain(equipmentId));
		return new Hardware({
			mac: this.mac,
			type: this.type,
			name: this.name,
			id,
			equipments,
		});
	}
}
