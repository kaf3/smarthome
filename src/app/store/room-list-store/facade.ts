import { Injectable } from '@angular/core';
import { RoomListState } from './state';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state';
import {
	selectCallState,
	selectRoomById,
	selectRoomListEntities,
	selectRoomListState,
	selectRooms,
} from './selectors';
import { combineLatest, Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import {
	LoadRoomList,
	OpenRoomList,
	UpsertRoom,
	UpsertRoomListWhenLeft,
	UpsertRoomWhenLeft,
} from './actions';
import { map } from 'rxjs/operators';
import { LoadableFacade } from '@models/common';
import { RoomList } from '@models/rooms';
import { Room } from '@models/room';

@Injectable()
export class RoomListFacade extends LoadableFacade<RoomListState> {
	public readonly rooms$: Observable<Room[]>;
	public readonly roomEntities$: Observable<Dictionary<Room>>;
	public readonly roomList$: Observable<RoomList>;
	private readonly roomListState: Observable<RoomListState>;

	constructor(store: Store<AppState>) {
		super(store, selectCallState);

		this.rooms$ = this.store.pipe(select(selectRooms));
		this.roomEntities$ = this.store.pipe(select(selectRoomListEntities));
		this.roomListState = this.store.pipe(select(selectRoomListState));
		this.roomList$ = combineLatest([this.roomListState, this.rooms$]).pipe(
			map(
				([roomListState, rooms]) =>
					new RoomList({ activeRoom: roomListState.activeRoom, rooms }),
			),
		);
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
