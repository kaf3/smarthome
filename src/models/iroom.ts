import {IEquipment} from './iequipment';

export interface IRoom {
    id: number;
    roomName: string;
    equipment: IEquipment[];
}
