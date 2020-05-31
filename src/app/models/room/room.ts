import { Hardware, HardwareDTO, HardwareDTOProps } from '@models/hardware';
import { BaseDomain } from '@models/common/baseDomain';
import { Collection, OmitByPropType } from '@models/common';

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
	constructor(source: RoomProps | Room) {
		super(source.id, source.name);

		this.hardwares = [...source.hardwares];
		this.activeHardware = new Hardware(source.activeHardware);
	}
	public createDTO(hardwareCollection: RoomDTO['hardwareCollection']): RoomDTO {
		return new RoomDTO({
			name: this.name,
			hardwareCollection,
		});
	}

	public getBase(): BaseRoom {
		return new BaseRoom(this.id, this.name);
	}

	static readonly initial = new Room({
		...BaseRoom.initial,
		activeHardware: Hardware.initial,
		hardwares: [],
	});
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
