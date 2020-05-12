import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RoomState } from './state';
import { Observable } from 'rxjs';
import {
	selectActiveEquipment,
	selectAllEquipmentFromRoom,
	selectCallState,
	selectEquipmentByIdFromRoom,
	selectEquipmentEntitiesFromRoom,
	selectRoomName,
} from './selectors';
import { AppState } from '../state';
import { Dictionary } from '@ngrx/entity';
import { Equipment, LoadableFacade, Room } from '@models';
import { UpsertRoomSuccess } from './actions';

@Injectable()
export class RoomFacade extends LoadableFacade<RoomState> {
	public readonly roomName$: Observable<string>;
	public readonly equipmentEntities$: Observable<Dictionary<Equipment>>;
	public readonly equipmentList$: Observable<Equipment[]>;
	public readonly activeEquipment$: Observable<Equipment>;

	constructor(store: Store<AppState>) {
		super(store, selectCallState);
		this.roomName$ = this.store.pipe(select(selectRoomName));
		this.equipmentEntities$ = this.store.pipe(select(selectEquipmentEntitiesFromRoom));
		this.equipmentList$ = this.store.pipe(select(selectAllEquipmentFromRoom));
		this.activeEquipment$ = this.store.pipe(select(selectActiveEquipment));
	}

	public equipmentById$(id: Equipment['id']): Observable<Equipment> {
		return this.store.pipe(select(selectEquipmentByIdFromRoom, id));
	}

	public upsertRoomSuccess(room: Room, activeEquipment: Equipment): void {
		this.store.dispatch(new UpsertRoomSuccess({ room, activeEquipment }));
	}
}
