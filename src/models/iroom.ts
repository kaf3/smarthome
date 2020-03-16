import { IEquipsDB } from './iequipsdb';

export interface IRoom {
    id: number;
    roomName: string;
    equipsdb: IEquipsDB;
}
