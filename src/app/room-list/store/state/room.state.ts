import { IRoom } from 'src/models/iroom'


export interface RoomState {
    room: IRoom
}

const initialRoom: IRoom = {
    id: -1,
    roomName: "",
    equipsdb: {r_name: ""}
}

export const initialRoomState: RoomState = {
    room: initialRoom,
}

