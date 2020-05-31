import { Injectable } from '@angular/core';
import { LoadableFacade } from '@models/common';
import { AppState } from '../state';
import { select, Store } from '@ngrx/store';
import { selectAll, selectById, selectCallState, selectHardwareState } from './selectors';
import { combineLatest, Observable } from 'rxjs';
import { Equipment } from '@models/equipment';
import { Hardware } from '@models/hardware';
import { HardwareState } from './reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class HardwareFacade extends LoadableFacade<HardwareState> {
	public readonly equipments$: Observable<Equipment[]>;
	public readonly hardware$: Observable<Hardware>;
	public readonly hardwareState$: Observable<HardwareState>;

	constructor(store: Store<AppState>) {
		super(store, selectCallState);
		this.equipments$ = this.store.pipe(select(selectAll));
		this.hardwareState$ = this.store.pipe(select(selectHardwareState));
		this.hardware$ = combineLatest([this.hardwareState$, this.equipments$]).pipe(
			map(
				([hardwareState, equipments]) =>
					new Hardware({
						...hardwareState.baseHardware,
						activeEquipment: hardwareState.activeEquipment,
						equipments,
					}),
			),
		);
	}

	public equipmentById(id: Equipment['id']): Observable<Equipment> {
		return this.store.pipe(select(selectById, id));
	}
}
