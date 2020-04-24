import {IEquipmentDTO} from './iequipmentDTO';

export interface IRoomsDTO {
    [roomName: string]: IEquipmentDTO;
}
