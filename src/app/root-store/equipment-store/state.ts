import {Equipment} from 'src/models/equipment';

export interface EquipmentState {
    equipment: Equipment;
}

const initialEquipment: Equipment = {
    name: '',
    value: false,
    type: '',
    group: '',
    id: '',
    location: '',
    working: false,
    frequencyUpdating: [],
};

export const initialEquipmentState: EquipmentState = {
    equipment: initialEquipment,
};
