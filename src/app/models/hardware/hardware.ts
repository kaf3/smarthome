import { Equipment, EquipmentDTO } from '@models/equipment';
import { BaseDomain } from '@models/common/baseDomain';
import { OmitByPropType } from '@models/common';
import { createEntityAdapter, Dictionary, EntityState } from '@ngrx/entity';

/*const hostHardware = mixinHost<typeof BaseHardware>(BaseHardware);
const HardwareWithChildren: HostConstructor<
	Hardware,
	Equipment,
	typeof BaseHardware
> = hostHardware<Hardware, Equipment, 'equipments'>('equipments');*/

export type HardwareDTOProps = OmitByPropType<HardwareDTO, Function>;

export class HardwareDTO {
	public readonly mac: number | string | null;

	public readonly name: string;

	public readonly type: string | null;

	public readonly numberOfEquip: number;

	public readonly equipmentCollection: Dictionary<EquipmentDTO>;

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

export class Hardware extends BaseDomain {
	public readonly equipmentEntityState: EntityState<Equipment>;
	public readonly mac: number | string | null;
	public readonly type: string | null;
	public activeEquipment: Equipment;

	constructor(source: Hardware) {
		super(source.id, source.name);
		this.mac = source.mac;
		this.type = source.type;
		this.equipmentEntityState = { ...source.equipmentEntityState };
		this.activeEquipment = new Equipment(source.activeEquipment);
	}

	public static adapter = createEntityAdapter<Equipment>({
		sortComparer: false,
		selectId: (eqp) => eqp.id ?? '',
	});

	public static createDTO(hardware: Hardware): HardwareDTO {
		return new HardwareDTO({
			mac: hardware.mac,
			type: hardware.type,
			name: hardware.name,
			numberOfEquip: hardware.equipmentEntityState.ids.length,
			equipmentCollection: this.createEquipmentCollection(hardware),
		});
	}

	private static createEquipmentCollection(hardware: Hardware): Dictionary<EquipmentDTO> {
		/*		const equipmentMap = new Map<keyof Collection<EquipmentDTO>, EquipmentDTO>();
		hardware.equipments.forEach((equipment) => {
			equipmentMap.set(String(equipment.id), Equipment.createDTO(equipment));
		});
		return Object.fromEntries(equipmentMap);*/
		const equipmentCollection: Dictionary<EquipmentDTO> = {};
		hardware.equipmentEntityState.ids.forEach((id) => {
			equipmentCollection[id] = Equipment.createDTO(
				hardware.equipmentEntityState.entities[id] ?? Equipment.initial,
			);
		});
		return equipmentCollection;
	}

	public static getEquipments(hardware: Hardware): (Equipment | undefined)[] {
		return Object.values(hardware?.equipmentEntityState?.entities);
	}

	static readonly initial = new Hardware({
		...BaseDomain.initial,
		mac: null,
		type: null,
		activeEquipment: Equipment.initial,
		equipmentEntityState: Hardware.adapter.getInitialState(),
	});

	public static updateEquipment(hardware: Hardware, equipment: Equipment): Hardware {
		return new Hardware({
			...hardware,
			equipmentEntityState: Hardware.adapter.upsertOne(
				equipment,
				hardware.equipmentEntityState,
			),
		});
	}

	public static getEquipment(id: Equipment['id'], hardware?: Hardware): Equipment | undefined {
		return hardware?.equipmentEntityState.entities[id ?? ''];
	}
}

HardwareDTO.prototype.createDomain = function (
	id: Hardware['id'],
	oldHardware?: Hardware,
): Hardware {
	const ids: Hardware['equipmentEntityState']['ids'] = [];
	const entries = Object.entries(this.equipmentCollection).map(([equipmentId, equipmentDTO]) => {
		(ids as string[]).push(equipmentId);
		return [
			equipmentId,
			new EquipmentDTO(equipmentDTO as EquipmentDTO).createDomain(
				equipmentId,
				oldHardware?.equipmentEntityState.entities[equipmentId],
			),
		];
	});

	return new Hardware({
		mac: this.mac,
		type: this.type,
		name: this.name,
		id,
		activeEquipment: oldHardware?.activeEquipment ?? Equipment.initial,
		equipmentEntityState: { ids, entities: Object.fromEntries(entries) },
	});
};
