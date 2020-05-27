import { Hardware, initialHardware } from '../hardware/hardware';
import { RoomDTO } from '@models/room/roomDTO';

interface IRoom {
	readonly id: string | null;
	readonly name: string;
	readonly hardwares: Hardware[];
	readonly activeHardware: Hardware;
}

export class Room implements IRoom {
	public readonly id: string | null;
	public readonly name: string;
	public readonly hardwares: Hardware[];
	public readonly activeHardware: Hardware;

	constructor(source: Room | IRoom) {
		this.id = source.id;
		this.name = source.name;
		this.hardwares = [...source.hardwares];
		this.activeHardware = new Hardware(source.activeHardware);
	}

	public createDTO(hardwareCollection: RoomDTO['hardwareCollection']): RoomDTO {
		return new RoomDTO({
			name: this.name,
			hardwareCollection,
		});
	}
}

export const initialRoom = new Room({
	id: null,
	name: '',
	activeHardware: initialHardware,
	hardwares: [],
});
