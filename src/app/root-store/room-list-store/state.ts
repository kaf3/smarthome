import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IRoom} from 'src/models/iroom';

export interface RoomListState extends EntityState<IRoom> {
}

export const roomsAdapter: EntityAdapter<IRoom> = createEntityAdapter<IRoom>({selectId: (room: IRoom) => room.id, sortComparer: false});

export const initialRoomListState: RoomListState = roomsAdapter.getInitialState();







