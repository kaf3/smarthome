import { EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity"
import { RoomState, initialRoomState } from '../../room-list/store/state/room.state'
import { IRoom } from 'src/models/iroom';

export interface RoomsAndRoomState {
    roomListState: RoomListState;
    roomState: RoomState;
}

export interface RoomListState extends EntityState<IRoom> {
 }

export const roomsAdapter: EntityAdapter<IRoom> = createEntityAdapter<IRoom>({selectId: (room: IRoom) => room.id, sortComparer: false})

export const initialRoomListState: RoomListState = roomsAdapter.getInitialState();

export const roomsAndRoomInitialState: RoomsAndRoomState = {
    roomState: initialRoomState,
    roomListState: initialRoomListState
}






