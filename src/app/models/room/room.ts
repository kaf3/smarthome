import { Hardware, HardwareDTO, HardwareDTOProps } from '@models/hardware';
import { BaseDomain } from '@models/common/baseDomain';
import { Collection, OmitByPropType } from '@models/common';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export class BaseRoom extends BaseDomain {
	static readonly initial = new BaseRoom(BaseDomain.initial.id, BaseDomain.initial.name);
}

export type RoomDTOProps = OmitByPropType<RoomDTO, Function>;

export class RoomDTO {
	public readonly name: string;
	public readonly hardwareCollection: Collection<HardwareDTO>;
	createDomain: (id: Room['id']) => Room;

	constructor(source: RoomDTO | RoomDTOProps) {
		this.name = source.name;
		this.hardwareCollection = { ...source.hardwareCollection };
	}
}

export type RoomProps = OmitByPropType<Room, Function>;

export class Room extends BaseRoom {
	public readonly hardwares: Hardware[];
	public activeHardware: Hardware;
	constructor(source: Room) {
		super(source.id, source.name);

		this.hardwares = [...source.hardwares];
		this.activeHardware = new Hardware(source.activeHardware);
	}
	public static createDTO(room: Room): RoomDTO {
		return new RoomDTO({
			name: room.name,
			hardwareCollection: this.createHardwareCollection(room),
		});
	}

	public static getBase(room: Room): BaseRoom {
		return new BaseRoom(room.id, room.name);
	}

	private static createHardwareCollection(room: Room): Collection<HardwareDTO> {
		const hardwareMap = new Map<keyof Collection<HardwareDTO>, HardwareDTO>();
		room.hardwares.forEach((hardware) => {
			hardwareMap.set(hardware.id, Hardware.createDTO(hardware));
		});
		return Object.fromEntries(hardwareMap);
	}

	static readonly initial = new Room({
		...BaseRoom.initial,
		activeHardware: Hardware.initial,
		hardwares: [],
	});

	private static readonly adapter: EntityAdapter<Hardware> = createEntityAdapter<Hardware>({
		selectId: (hardware) => hardware.id,
		sortComparer: false,
	});

	private static createEntityState(room: Room): EntityState<Hardware> {
		return this.adapter.addAll(room.hardwares, this.adapter.getInitialState());
	}

	public static deleteHardware(room: Room, hardware: Hardware): Room {
		let entityHardware: EntityState<Hardware> = this.createEntityState(room);
		entityHardware = this.adapter.removeOne(hardware.id, entityHardware);
		return new Room({
			...room,
			hardwares: Object.values(entityHardware.entities),
		});
	}

	public static addHardware(room: Room, hardware: Hardware): Room {
		let entityHardware: EntityState<Hardware> = this.createEntityState(room);
		entityHardware = this.adapter.addOne(hardware, entityHardware);
		return new Room({
			...room,
			hardwares: Object.values(entityHardware.entities),
		});
	}

	public static updateHardware(room: Room, hardware: Hardware): Room {
		let entityHardware: EntityState<Hardware> = this.createEntityState(room);
		entityHardware = this.adapter.upsertOne(hardware, entityHardware);
		return new Room({
			...room,
			hardwares: Object.values(entityHardware.entities),
		});
	}
}

RoomDTO.prototype.createDomain = function (id: Room['id']): Room {
	const hardwares = Object.entries(
		this.hardwareCollection,
	).map(([hardwareId, hardwareDTO]: [Hardware['id'], HardwareDTOProps]) =>
		new HardwareDTO({ ...hardwareDTO }).createDomain(hardwareId),
	);
	return new Room({
		name: this.name,
		activeHardware: Hardware.initial,
		id,
		hardwares,
	});
};
