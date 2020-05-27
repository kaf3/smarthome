import { Equipment } from '@models/equipment';
import { HardwareDTO } from '@models/hardware/hardwareDTO';

interface IHardware {
	readonly mac: number | string | null;
	readonly name: string;
	readonly type: string | null;
	readonly equipments: Equipment[];
	readonly id: string | null;
}

export class Hardware implements IHardware {
	public readonly mac: number | string | null;
	public readonly name: string;
	public readonly type: string | null;
	public readonly equipments: Equipment[];
	public readonly id: string | null;
	constructor(source: Hardware | IHardware) {
		this.id = source.id;
		this.mac = source.mac;
		this.type = source.type;
		this.name = source.name;
		this.equipments = [...source.equipments];
	}

	/*	public createEquipmentCollection(): Collection<Equipment> {
		return DTO.createCollection<Equipment>(this.equipments);
	}*/
	public createDTO(equipmentCollection: HardwareDTO['equipmentCollection']): HardwareDTO {
		return new HardwareDTO({
			mac: this.mac,
			type: this.type,
			name: this.name,
			numberOfEquip: this.equipments.length,
			equipmentCollection,
		});
	}
}

export const initialHardware = new Hardware({
	id: null,
	equipments: [],
	type: null,
	mac: null,
	name: '',
});
