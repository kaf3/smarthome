import { HardwareDTO, initialHardware } from '@models/hardware';
import { Room } from '@models/room/room';

export interface HardwareCollectionDTO {
	[hardwareId: string]: HardwareDTO;
}

interface IRoomDTO {
	readonly name: string;
	readonly hardwareCollection: HardwareCollectionDTO;
}

export class RoomDTO implements IRoomDTO {
	public readonly name: string;
	public readonly hardwareCollection: HardwareCollectionDTO;

	constructor(source: RoomDTO | IRoomDTO) {
		this.name = source.name;
		this.hardwareCollection = { ...source.hardwareCollection };
	}

	public createDomain(id: Room['id']): Room {
		const hardwares = Object.entries(this.hardwareCollection).map(([id, hardwareDTO]) =>
			hardwareDTO.createDomain(id),
		);
		return new Room({
			name: this.name,
			activeHardware: initialHardware,
			id,
			hardwares,
		});
	}
}
