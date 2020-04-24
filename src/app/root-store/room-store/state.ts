import {Room} from 'src/models/room';

export interface RoomState {
    room: Room;
}

const initialRoom: Room = {
    id: -1,
    roomName: '',
    equipment: [],
};

export const initialRoomState: RoomState = {
    room: initialRoom,
};
