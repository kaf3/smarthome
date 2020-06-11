import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RoomState } from './state';
import { Observable } from 'rxjs';
import { selectById, selectCallState, selectEntities, selectRoom } from './selectors';
import { AppState } from '../state';
import { GetRoom } from './actions';
import { LoadableFacade } from '@models/common';
import { Room } from '@models/room';
import { Hardware } from '@models/hardware';
import { Dictionary } from '@ngrx/entity';

@Injectable()
export class RoomFacade extends LoadableFacade<RoomState> {
	public readonly room$: Observable<Room>;
	public readonly hardwareEntities$: Observable<Dictionary<Hardware>>;

	constructor(store: Store<AppState>) {
		super(store, selectCallState);
		this.room$ = this.store.pipe(select(selectRoom));
		this.hardwareEntities$ = this.store.pipe(select(selectEntities));
	}

	public hardwareById$(id: Hardware['id']): Observable<Hardware> {
		return this.store.pipe(select(selectById, id));
	}

	public getRoom(id: Room['id']): void {
		this.store.dispatch(new GetRoom({ id }));
	}
}
