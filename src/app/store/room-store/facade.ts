import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RoomState } from './state';
import { combineLatest, Observable } from 'rxjs';
import {
	selectAllEquipmentFromRoom,
	selectCallState,
	selectEquipmentByIdFromRoom,
	selectRoomName,
	selectRoomState,
} from './selectors';
import { AppState } from '../state';
import { Equipment, LoadableFacade, Room } from '@models';
import { map } from 'rxjs/operators';

@Injectable()
export class RoomFacade extends LoadableFacade<RoomState> {
	public readonly roomName$: Observable<string>;
	public readonly equipmentList$: Observable<Equipment[]>;
	public readonly room$: Observable<Room>;
	public readonly roomState$: Observable<RoomState>;

	constructor(store: Store<AppState>) {
		super(store, selectCallState);
		this.roomName$ = this.store.pipe(select(selectRoomName));
		this.equipmentList$ = this.store.pipe(select(selectAllEquipmentFromRoom));
		this.roomState$ = this.store.pipe(select(selectRoomState));
		this.room$ = combineLatest([this.roomState$, this.equipmentList$]).pipe(
			map(([roomState, equipment]) => ({
				roomName: roomState.roomName,
				id: roomState.id,
				activeEquipment: roomState.activeEquipment,
				equipment,
			})),
		);
	}

	public equipmentById$(id: Equipment['id']): Observable<Equipment> {
		return this.store.pipe(select(selectEquipmentByIdFromRoom, id));
	}
}
