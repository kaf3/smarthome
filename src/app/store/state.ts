import {RouterReducerState} from '@ngrx/router-store';
import {RoomListStoreState} from './room-list-store';
import {RoomStoreState} from './room-store';
import {EquipmentStoreState} from './equipment-store';
import {EquipmentFormStoreState} from './equipment-form-store';
import {createSelector} from '@ngrx/store';

export interface AppState {
    RoomListState: RoomListStoreState.RoomListState;
    RoomState: RoomStoreState.RoomState;
    EquipmentState: EquipmentStoreState.EquipmentState;
    EquipmentForm: EquipmentFormStoreState.EquipmentFormState;
    router?: RouterReducerState;
}

export const initialAppState: AppState = {
    RoomListState: RoomListStoreState.initialRoomListState,
    RoomState: RoomStoreState.initialRoomState,
    EquipmentState: EquipmentStoreState.initialEquipmentState,
    EquipmentForm: EquipmentFormStoreState.initialEquipmentFormState,
};

export const selectRoomListLazyState = createSelector(
    (state: AppState) => state.RoomListState,
    state => state,
);
