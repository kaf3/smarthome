import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Room} from 'src/models/room';

export interface RoomListState extends EntityState<Room> {}

export const roomsAdapter: EntityAdapter<Room> = createEntityAdapter<Room>({
    selectId: (room: Room) => room.id,
    sortComparer: false,
});

export const initialRoomListState: RoomListState = roomsAdapter.getInitialState();
