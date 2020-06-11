import { Injectable } from '@angular/core';
import { LoadableFacade } from '@models/common';
import { AppState } from '../state';
import { select, Store } from '@ngrx/store';
import { selectById, selectCallState, selectHardware } from './selectors';
import { Observable } from 'rxjs';
import { Equipment } from '@models/equipment';
import { Hardware } from '@models/hardware';
import { HardwareState } from './reducer';

@Injectable()
export class HardwareFacade extends LoadableFacade<HardwareState> {
	public readonly hardware$: Observable<Hardware>;

	constructor(store: Store<AppState>) {
		super(store, selectCallState);
		this.hardware$ = this.store.pipe(select(selectHardware));
	}

	public equipmentById(id: Equipment['id']): Observable<Equipment> {
		return this.store.pipe(select(selectById, id));
	}
}
