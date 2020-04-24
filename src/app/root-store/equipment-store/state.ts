import {IEquipment} from 'src/models/iequipment';

export interface EquipmentState {
    equipment: IEquipment;
}

const initialEquipment: IEquipment = {
    name: '',
    value: false,
    type: '',
    group: '',
    id: '',
    location: '',
};

export const initialEquipmentState: EquipmentState = {
    equipment: initialEquipment,
};
