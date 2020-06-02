import { Equipment, EquipmentDTO, EquipmentDTOProps } from '@models/equipment';
import { BaseDomain } from '@models/common/baseDomain';
import { Collection, OmitByPropType } from '@models/common';

export class BaseHardware extends BaseDomain {
	protected constructor(
		id: BaseDomain['id'],
		name: BaseDomain['name'],
		public readonly mac: number | string | null,
		public readonly type: string | null,
	) {
		super(id, name);
	}

	static readonly initial = new BaseHardware(
		BaseDomain.initial.id,
		BaseDomain.initial.name,
		null,
		null,
	);
}

export type HardwareDTOProps = OmitByPropType<HardwareDTO, Function>;

export class HardwareDTO {
	public readonly mac: number | string;
	public readonly name: string;
	public readonly type: string;
	public readonly numberOfEquip: number;
	public readonly equipmentCollection: Collection<EquipmentDTO>;
	public createDomain: (id: Hardware['id']) => Hardware;

	constructor(source: HardwareDTO | HardwareDTOProps) {
		this.equipmentCollection = { ...source.equipmentCollection };
		this.mac = source.mac;
		this.name = source.name;
		this.type = source.type;
		this.numberOfEquip = source.numberOfEquip;
	}
}

export type HardwareProps = OmitByPropType<Hardware, Function>;

export class Hardware extends BaseHardware {
	public readonly equipments: Equipment[];
	public activeEquipment: Equipment;
	constructor(source: HardwareProps | Hardware) {
		super(source.id, source.name, source.mac, source.type);
		this.equipments = [...source.equipments];
		this.activeEquipment = new Equipment(source.activeEquipment);
	}
	public createDTO(): HardwareDTO {
		return new HardwareDTO({
			mac: this.mac,
			type: this.type,
			name: this.name,
			numberOfEquip: this.equipments.length,
			equipmentCollection: this.createEquipmentCollection(),
		});
	}

	private createEquipmentCollection(): Collection<EquipmentDTO> {
		const equipmentMap = new Map<keyof Collection<EquipmentDTO>, EquipmentDTO>();
		this.equipments.forEach((equipment) => {
			const equipmentDTO = equipment.createDTO();
			equipmentMap.set(equipment.id, equipmentDTO);
		});
		return Object.fromEntries(equipmentMap);
	}

	public getBase(): BaseHardware {
		return new BaseHardware(this.id, this.name, this.mac, this.type);
	}

	static readonly initial = new Hardware({
		...BaseHardware.initial,
		equipments: [],
		activeEquipment: Equipment.initial,
	});
}

HardwareDTO.prototype.createDomain = function (id: Hardware['id']): Hardware {
	const equipments = Object.entries(
		this.equipmentCollection,
	).map(([equipmentId, equipmentDTO]: [Equipment['id'], EquipmentDTOProps]) =>
		new EquipmentDTO({ ...equipmentDTO }).createDomain(equipmentId),
	);
	return new Hardware({
		mac: this.mac,
		type: this.type,
		name: this.name,
		id,
		equipments,
		activeEquipment: Equipment.initial,
	});
};
