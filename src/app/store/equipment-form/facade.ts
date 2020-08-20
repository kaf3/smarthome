import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Equipment } from '@models/equipment';
import { selectEquipmentFormState } from './selectors';
import { LoadEquipmentForm, SubmitEquipmentForm } from './actions';
import { EquipmentFormState } from './reducer';

@Injectable()
export class EquipmentFormFacade {
	public readonly equipmentFormState$: Observable<EquipmentFormState>;

	constructor(private readonly store: Store<EquipmentFormState>) {
		this.equipmentFormState$ = this.store.pipe(select(selectEquipmentFormState));
	}

	public loadEquipmentForm(equipment: Equipment): void {
		this.store.dispatch(new LoadEquipmentForm({ equipment }));
	}

	public submitEquipmentForm(equipment: Equipment): void {
		this.store.dispatch(new SubmitEquipmentForm({ equipment }));
	}
}
