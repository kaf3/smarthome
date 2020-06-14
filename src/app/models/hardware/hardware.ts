import { Equipment, EquipmentDTO, EquipmentDTOProps } from '@models/equipment';
import { BaseDomain } from '@models/common/baseDomain';
import { Collection, OmitByPropType } from '@models/common';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

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
			equipmentMap.set(equipment.id, Equipment.createDTO(equipment));
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

	private static readonly adapter: EntityAdapter<Equipment> = createEntityAdapter<Equipment>({
		selectId: (eqp) => eqp.id,
		sortComparer: false,
	});

	private static createEntityState(hardware: Hardware): EntityState<Equipment> {
		return this.adapter.addAll(hardware.equipments, this.adapter.getInitialState());
	}

	public static updateEquipment(hardware: Hardware, equipment: Equipment): Hardware {
		let entityEquipment: EntityState<Equipment> = this.createEntityState(hardware);
		entityEquipment = this.adapter.upsertOne(equipment, entityEquipment);
		return new Hardware({
			...hardware,
			equipments: Object.values(entityEquipment.entities),
		});
	}
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
