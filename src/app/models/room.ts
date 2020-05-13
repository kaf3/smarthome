import { Equipment } from './equipment';

export interface Room {
	id: number;
	roomName: string;
	equipment: Equipment[];
	activeEquipment: Equipment;
}
