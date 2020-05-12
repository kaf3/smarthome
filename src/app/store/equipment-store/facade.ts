import { Injectable } from '@angular/core';
import { LoadableFacade } from '../../models/loadable.facade';
import { select, Store } from '@ngrx/store';
import { EquipmentState } from './state';
import { AppState } from '../state';
import { selectCallState, selectEquipment } from './selectors';
import { Observable } from 'rxjs';
import { Equipment } from '@models';

@Injectable()
export class EquipmentFacade extends LoadableFacade<EquipmentState> {
	public readonly equipment$: Observable<Equipment>;

	constructor(store: Store<AppState>) {
		super(store, selectCallState);

		this.equipment$ = this.store.pipe(select(selectEquipment));
	}
}
