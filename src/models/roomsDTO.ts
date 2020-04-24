import {EquipmentDTO} from './equipmentDTO';

export interface RoomsDTO {
    [roomName: string]: EquipmentDTO;
}
