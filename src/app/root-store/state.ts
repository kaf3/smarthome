import {RouterReducerState} from '@ngrx/router-store';
import {RoomListStoreState} from './room-list-store';
import {RoomStoreState} from './room-store';
import {EquipmentListStoreState} from './equipment-list-store';
import {EquipmentStoreState} from './equipment-store';

export interface AppState {
    RoomListState: RoomListStoreState.RoomListState;
    RoomState: RoomStoreState.RoomState;
    EquipmentListState: EquipmentListStoreState.EquipmentListState;
    EquipmentState: EquipmentStoreState.EquipmentState;
    router?: RouterReducerState;
}

export const initialAppState: AppState = {
    //что делать с начальным состоянием
    RoomListState: RoomListStoreState.initialRoomListState,
    RoomState: RoomStoreState.initialRoomState,
    EquipmentListState: EquipmentListStoreState.initialEquipmentListState,
    EquipmentState: EquipmentStoreState.initialEquipmentState,
};
