import { Injectable } from '@angular/core';
import { RoomListState } from './state';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state';
import { selectCallState, selectRoomById, selectRoomList, selectRooms } from './selectors';
import { Observable } from 'rxjs';
import {
	LoadRoomList,
	OpenRoomList,
	UpsertRoom,
	UpsertRoomListWhenLeft,
	UpsertRoomWhenLeft,
} from './actions';
import { LoadableFacade } from '@models/common';
import { RoomList } from '@models/rooms';
import { Room } from '@models/room';

@Injectable()
export class RoomListFacade extends LoadableFacade<RoomListState> {
	public readonly rooms$: Observable<Room[]>;
	public readonly roomList$: Observable<RoomList>;

	constructor(store: Store<AppState>) {
		super(store, selectCallState);

		this.rooms$ = this.store.pipe(select(selectRooms));
		this.roomList$ = this.store.pipe(select(selectRoomList));
	}

	public roomById$(id: Room['id']): Observable<Room> {
		return this.store.pipe(select(selectRoomById, id));
	}

	public upsertRoom(room: Room): void {
		this.store.dispatch(new UpsertRoom({ room }));
	}

	public upsertRoomWhenLeft(room: Room): void {
		this.store.dispatch(new UpsertRoomWhenLeft({ room }));
	}

	public upsertRoomListWhenLeft(roomList: RoomList): void {
		this.store.dispatch(new UpsertRoomListWhenLeft({ roomList }));
	}

	public loadRooms(): void {
		this.store.dispatch(new LoadRoomList());
	}

	public openRoomList(): void {
		this.store.dispatch(new OpenRoomList());
	}
}
