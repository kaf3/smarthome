import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Equipment} from '@models';

export interface RoomState extends EntityState<Equipment> {
    roomName: string;
}

export const roomAdapter: EntityAdapter<Equipment> = createEntityAdapter<Equipment>({
    selectId: (equipment: Equipment) => equipment.id,
    sortComparer: false,
});

export const initialRoomState: RoomState = roomAdapter.getInitialState({
    roomName: '',
});
