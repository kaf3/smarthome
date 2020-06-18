import { Hardware, HardwareDTO, HardwareDTOProps } from '@models/hardware';
import { BaseDomain } from '@models/common/baseDomain';
import { Collection, HostConstructor, mixinHost, OmitByPropType } from '@models/common';

export class BaseRoom extends BaseDomain {
	static readonly initial = new BaseRoom(BaseDomain.initial.id, BaseDomain.initial.name);
}

const hostRoom = mixinHost<typeof BaseRoom>(BaseRoom);
const RoomWithChildren: HostConstructor<Room, Hardware, typeof BaseRoom> = hostRoom<
	Room,
	Hardware,
	'hardwares'
>('hardwares');

export type RoomDTOProps = OmitByPropType<RoomDTO, Function>;

export class RoomDTO {
	public readonly name: string;
	public readonly hardwareCollection: Collection<HardwareDTO>;
	createDomain: (id: Room['id'], oldRoom?: Room) => Room;

	constructor(source: RoomDTO | RoomDTOProps) {
		this.name = source.name;
		this.hardwareCollection = { ...source.hardwareCollection };
	}
}

export type RoomProps = OmitByPropType<Room, Function>;

export class Room extends RoomWithChildren {
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
			hardwareMap.set(hardware.id ?? '', Hardware.createDTO(hardware));
		});
		console.log(Object.fromEntries(hardwareMap));
		return Object.fromEntries(hardwareMap);
	}

	static readonly initial = new Room({
		...BaseRoom.initial,
		activeHardware: Hardware.initial,
		hardwares: [],
	});

	public static deleteHardware(room: Room, hardware: Hardware): Room {
		return super.deleteChild(room, hardware);
	}

	public static addHardware(room: Room, hardware: Hardware): Room {
		return super.addChild(room, hardware);
	}

	public static updateHardware(room: Room, hardware: Hardware): Room {
		return super.updateChild(room, hardware);
	}

	public static getHardware(id: Hardware['id'], room?: Room): Hardware | undefined {
		return super.getChild(id, room);
	}
}

RoomDTO.prototype.createDomain = function (id: Room['id'], oldRoom?: Room): Room {
	const hardwares = Object.entries<HardwareDTOProps>(
		this.hardwareCollection,
	).map(([hardwareId, hardwareDTO]: [Hardware['id'], HardwareDTOProps]) =>
		new HardwareDTO({ ...hardwareDTO }).createDomain(hardwareId, Room.getHardware(id, oldRoom)),
	);
	return new Room({
		name: this.name,
		activeHardware: oldRoom?.activeHardware ?? Hardware.initial,
		id,
		hardwares,
	});
};
