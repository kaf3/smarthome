import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectCallState, selectRoomById, selectRoomList, selectRooms } from './selectors';
import { Observable } from 'rxjs';
import { LoadRoomList, UpdateRoom, UpsertRoomListWhenLeft, UpsertRoomWhenLeft } from './actions';
import { LoadableFacade } from '@models/common';
import { RoomList } from '@models/room-list';
import { Room } from '@models/room';
import { RoomListState } from './reducer';

@Injectable()
export class RoomListFacade extends LoadableFacade<RoomListState> {
	public readonly rooms$: Observable<Room[]>;
	public readonly roomList$: Observable<RoomList>;

	constructor(store: Store<RoomListState>) {
		super(store, selectCallState);

		this.rooms$ = this.store.pipe(select(selectRooms));
		this.roomList$ = this.store.pipe(select(selectRoomList));
	}

	public roomById$(id: Room['id']): Observable<Room> {
		return this.store.pipe(select(selectRoomById, id));
	}

	public upsertRoom(room: Room): void {
		this.store.dispatch(new UpdateRoom({ room }));
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
