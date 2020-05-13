import { Injectable } from '@angular/core';
import { LoadableFacade, Room } from '@models';
import { RoomListState } from './state';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state';
import {
	selectCallState,
	selectRoomById,
	selectRoomList,
	selectRoomListEntities,
} from './selectors';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { UpsertRoom } from './actions';

@Injectable()
export class RoomListFacade extends LoadableFacade<RoomListState> {
	public readonly roomList$: Observable<Room[]>;
	public readonly roomEntities$: Observable<Dictionary<Room>>;

	constructor(store: Store<AppState>) {
		super(store, selectCallState);

		this.roomList$ = this.store.pipe(select(selectRoomList));
		this.roomEntities$ = this.store.pipe(select(selectRoomListEntities));
	}

	public roomById$(id: Room['id']): Observable<Room> {
		return this.store.pipe(select(selectRoomById, id));
	}

	public upsertRoom(room: Room): void {
		this.store.dispatch(new UpsertRoom({ room }));
	}
}
