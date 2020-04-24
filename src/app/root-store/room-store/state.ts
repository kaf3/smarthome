import {IRoom} from 'src/models/iroom';


export interface RoomState {
  room: IRoom;
}

const initialRoom: IRoom = {
  id: -1,
  roomName: '',
  equipment: [],
};

export const initialRoomState: RoomState = {
  room: initialRoom,
};

