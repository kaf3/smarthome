import { Injectable } from '@angular/core';
import { LoadableFacade } from '../../models/loadable.facade';
import { RoomListState } from './state';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state';
import {
	selectCallState,
	selectRoomByName,
	selectRoomList,
	selectRoomListEntities,
} from './selectors';
import { Observable } from 'rxjs';
import { Room } from '@models';
import { Dictionary } from '@ngrx/entity';

@Injectable()
export class RoomListFacade extends LoadableFacade<RoomListState> {
	public readonly roomList$: Observable<Room[]>;
	public readonly roomEntities$: Observable<Dictionary<Room>>;

	constructor(store: Store<AppState>) {
		super(store, selectCallState);

		this.roomList$ = this.store.pipe(select(selectRoomList));
		this.roomEntities$ = this.store.pipe(select(selectRoomListEntities));
	}

	public roomByName$(name: Room['roomName']): Observable<Room> {
		return this.store.pipe(select(selectRoomByName, name));
	}
}
