import {Equipment} from 'src/app/models/equipment';
import {CallState, LoadingState} from '@models';

export interface EquipmentState {
    equipment: Equipment;
    callState: CallState;
}

const initialEquipment: Equipment = {
    name: '',
    value: false,
    type: null,
    group: null,
    id: '',
    location: '',
    working: false,
    frequencyUpdating: [],
};

export const initialEquipmentState: EquipmentState = {
    equipment: initialEquipment,
    callState: LoadingState.INIT,
};
