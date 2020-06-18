import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
	selectCallState,
	selectRoomById,
	selectRoomList,
	selectRoomListEntities,
	selectRooms,
} from './selectors';
import { Observable } from 'rxjs';
import {
	AddRoom,
	LoadRoomList,
	UpdateRoom,
	UpsertRoomListWhenLeft,
	UpsertRoomWhenLeft,
} from './actions';
import { LoadableFacade } from '@models/common';
import { RoomList } from '@models/room-list';
import { Room } from '@models/room';
import { RoomListState } from './reducer';
import { Dictionary } from '@ngrx/entity';

@Injectable()
export class RoomListFacade extends LoadableFacade<RoomListState> {
	public readonly rooms$: Observable<Room[]>;
	public readonly roomListEntities$: Observable<Dictionary<Room>>;

	public readonly roomList$: Observable<RoomList>;

	constructor(store: Store<RoomListState>) {
		super(store, selectCallState);

		this.rooms$ = this.store.pipe(select(selectRooms));
		this.roomList$ = this.store.pipe(select(selectRoomList));
		this.roomListEntities$ = this.store.pipe(select(selectRoomListEntities));
	}

	public roomById$(id: Room['id']): Observable<Room> {
		return this.store.pipe(select(selectRoomById, id));
	}

	public updateRoom(room: Room): void {
		this.store.dispatch(new UpdateRoom({ room }));
	}

	public addRoom(room: Room): void {
		this.store.dispatch(new AddRoom({ room }));
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
}
