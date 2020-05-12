import { Equipment } from './equipment';

export interface Room {
	roomName: string;
	equipment: Equipment[];
	activeEquipment: Equipment[];
}
