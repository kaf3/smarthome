import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {CallState, Equipment, LoadingState} from '@models';

export interface RoomState extends EntityState<Equipment> {
    roomName: string;
    callState: CallState;
}

export const roomAdapter: EntityAdapter<Equipment> = createEntityAdapter<Equipment>({
    selectId: (equipment: Equipment) => equipment.id,
    sortComparer: false,
});

export const initialRoomState: RoomState = roomAdapter.getInitialState({
    roomName: '',
    callState: LoadingState.INIT,
});
