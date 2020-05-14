import { Equipment, initialEquipment } from './equipment';

export interface Room {
	id: number;
	roomName: string;
	equipment: Equipment[];
	activeEquipment: Equipment;
}

export const initialRoom = {
	id: -1,
	roomName: '',
	equipment: [],
	activeEquipment: initialEquipment,
};
