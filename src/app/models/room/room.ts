import { Hardware, HardwareDTO } from '@models/hardware';
import { BaseDomain } from '@models/common/baseDomain';
import { OmitByPropType } from '@models/common';
import { createEntityAdapter, Dictionary, EntityState } from '@ngrx/entity';

/*const hostRoom = mixinHost<typeof BaseRoom>(BaseRoom);
const RoomWithChildren: HostConstructor<Room, Hardware, typeof BaseRoom> = hostRoom<
	Room,
	Hardware,
	'hardwares'
>('hardwares');*/

export type RoomDTOProps = OmitByPropType<RoomDTO, Function>;

export class RoomDTO {
	public readonly name: string;

	public readonly hardwareCollection: Dictionary<HardwareDTO>;

	createDomain: (id: Room['id'], oldRoom?: Room) => Room;

	constructor(source: RoomDTO | RoomDTOProps) {
		this.name = source.name;
		this.hardwareCollection = { ...source.hardwareCollection };
	}
}

export type RoomProps = OmitByPropType<Room, Function>;

export class Room extends BaseDomain {
	public readonly hardwareEntityState: EntityState<Hardware>;

	static adapter = createEntityAdapter<Hardware>({
		sortComparer: false,
		selectId: (h) => h.id ?? '',
	});

	constructor(source: Room) {
		super(source.id, source.name);
		this.hardwareEntityState = { ...source.hardwareEntityState };
	}

	public static createDTO(room: Room): RoomDTO {
		return new RoomDTO({
			name: room.name,
			hardwareCollection: this.createHardwareCollection(room),
		});
	}

	public static getHardwares(room: Room): (Hardware | undefined)[] {
		return Object.values(room.hardwareEntityState.entities);
	}

	private static createHardwareCollection(room: Room): Dictionary<HardwareDTO> {
		const hardwareCollection: Dictionary<HardwareDTO> = {};
		Object.entries(room.hardwareEntityState.entities).forEach(
			([id, hardware]) =>
				(hardwareCollection[id] = Hardware.createDTO(hardware ?? Hardware.initial)),
		);
		return hardwareCollection;
	}

	static readonly initial = new Room({
		...BaseDomain.initial,
		hardwareEntityState: Room.adapter.getInitialState(),
	});

	public static deleteHardware(room: Room, hardware: Hardware): Room {
		return new Room({
			...room,
			hardwareEntityState: Room.adapter.removeOne(
				hardware.id ?? '',
				room.hardwareEntityState,
			),
		});
	}

	public static addHardware(room: Room, hardware: Hardware): Room {
		return new Room({
			...room,
			hardwareEntityState: Room.adapter.addOne(hardware, room.hardwareEntityState),
		});
	}

	public static updateHardware(room: Room, hardware: Hardware): Room {
		return new Room({
			...room,
			hardwareEntityState: Room.adapter.upsertOne(hardware, room.hardwareEntityState),
		});
	}

	public static getHardware(id: Hardware['id'], room?: Room): Hardware | undefined {
		return room?.hardwareEntityState.entities[id ?? ''];
	}
}

RoomDTO.prototype.createDomain = function (id: Room['id'], oldRoom?: Room): Room {
	const ids: Room['hardwareEntityState']['ids'] = [];
	const entries = Object.entries(this.hardwareCollection).map(([hardwareId, hardwareDTO]) => {
		(ids as string[]).push(hardwareId);
		return [
			hardwareId,
			new HardwareDTO(hardwareDTO as HardwareDTO).createDomain(
				hardwareId,
				oldRoom?.hardwareEntityState.entities[hardwareId],
			),
		];
	});
	return new Room({
		name: this.name,
		id,
		hardwareEntityState: { ids, entities: Object.fromEntries(entries) },
	});
};
