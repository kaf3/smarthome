import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectCallState, selectEquipment } from './selectors';
import { Observable } from 'rxjs';
import { Equipment } from '@models/equipment';
import { LoadableFacade } from '@models/common';
import { GetEquipmentSuccess } from './actions';
import { EquipmentState } from './reducer';

@Injectable()
export class EquipmentFacade extends LoadableFacade<EquipmentState> {
	public readonly equipment$: Observable<Equipment>;

	constructor(store: Store<EquipmentState>) {
		super(store, selectCallState);

		this.equipment$ = this.store.pipe(select(selectEquipment));
	}

	public loadEquipment(equipment: Equipment): void {
		this.store.dispatch(new GetEquipmentSuccess({ equipment }));
	}
}
