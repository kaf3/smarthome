import { Equipment, EquipmentDTO, EquipmentDTOProps } from '@models/equipment';
import { BaseDomain } from '@models/common/baseDomain';
import { Collection, HostConstructor, mixinHost, OmitByPropType } from '@models/common';

export class BaseHardware extends BaseDomain {
	constructor(
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

const hostHardware = mixinHost<typeof BaseHardware>(BaseHardware);
const HardwareWithChildren: HostConstructor<
	Hardware,
	Equipment,
	typeof BaseHardware
> = hostHardware<Hardware, Equipment, 'equipments'>('equipments');

export type HardwareDTOProps = OmitByPropType<HardwareDTO, Function>;

export class HardwareDTO {
	public readonly mac: number | string | null;

	public readonly name: string;

	public readonly type: string | null;

	public readonly numberOfEquip: number;

	public readonly equipmentCollection: Collection<EquipmentDTO>;

	public createDomain: (id: Hardware['id'], oldHardware?: Hardware) => Hardware;

	constructor(source: HardwareDTO | HardwareDTOProps) {
		this.equipmentCollection = { ...source.equipmentCollection };
		this.mac = source.mac;
		this.name = source.name;
		this.type = source.type;
		this.numberOfEquip = source.numberOfEquip;
	}
}

export type HardwareProps = OmitByPropType<Hardware, Function>;

export class Hardware extends HardwareWithChildren {
	public readonly equipments: Equipment[];

	public activeEquipment: Equipment;

	constructor(source: Hardware) {
		super(source.id, source.name, source.mac, source.type);
		this.equipments = [...source.equipments];
		this.activeEquipment = new Equipment(source.activeEquipment);
	}

	public static createDTO(hardware: Hardware): HardwareDTO {
		return new HardwareDTO({
			mac: hardware.mac,
			type: hardware.type,
			name: hardware.name,
			numberOfEquip: hardware.equipments.length,
			equipmentCollection: this.createEquipmentCollection(hardware),
		});
	}

	private static createEquipmentCollection(hardware: Hardware): Collection<EquipmentDTO> {
		const equipmentMap = new Map<keyof Collection<EquipmentDTO>, EquipmentDTO>();
		hardware.equipments.forEach((equipment) => {
			equipmentMap.set(String(equipment.id), Equipment.createDTO(equipment));
		});
		return Object.fromEntries(equipmentMap);
	}

	public static getBase(hardware: Hardware): BaseHardware {
		return new BaseHardware(hardware.id, hardware.name, hardware.mac, hardware.type);
	}

	static readonly initial = new Hardware({
		...BaseHardware.initial,
		equipments: [],
		activeEquipment: Equipment.initial,
	});

	public static updateEquipment(hardware: Hardware, equipment: Equipment): Hardware {
		return super.updateChild(hardware, equipment);
	}

	public static getEquipment(id: Equipment['id'], hardware?: Hardware): Equipment | undefined {
		return super.getChild(id, hardware);
	}
}

HardwareDTO.prototype.createDomain = function (
	id: Hardware['id'],
	oldHardware?: Hardware,
): Hardware {
	const equipments = Object.entries<EquipmentDTO>(
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
		activeEquipment: oldHardware?.activeEquipment ?? Equipment.initial,
	});
};
