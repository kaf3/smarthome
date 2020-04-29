import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Room} from '@models';

export interface RoomListState extends EntityState<Room> {}

export const roomsAdapter: EntityAdapter<Room> = createEntityAdapter<Room>({
    selectId: (room: Room) => room.roomName,
    sortComparer: false,
});

export const initialRoomListState: RoomListState = roomsAdapter.getInitialState();
