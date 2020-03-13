import { EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity"
import { RoomState, initialRoomState } from './room.state'
import { IRoom } from 'src/models/iroom';

export interface RoomsAndRoomState {
    roomsState: RoomsState,
    roomState: RoomState
}

export interface RoomsState extends EntityState<IRoom> { 
 }

export const roomsAdapter : EntityAdapter<IRoom> = createEntityAdapter<IRoom>({selectId: (room: IRoom) => room.id ,sortComparer: false})

export const initialRoomsState : RoomsState = roomsAdapter.getInitialState();

export const roomsAndRoomInitialState: RoomsAndRoomState = {
    roomState: initialRoomState,
    roomsState: initialRoomsState
}






