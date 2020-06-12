import { Injectable } from '@angular/core';
import { AppState } from '../state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EquipmentFormState } from './state';
import { selectEquipmentFormState } from './selectors';
import { LoadEquipmentForm, SubmitEquipmentForm } from './actions';
import { Equipment } from '@models/equipment';

@Injectable()
export class EquipmentFormFacade {
	public readonly equipmentFormState$: Observable<EquipmentFormState>;

	constructor(private readonly store: Store<AppState>) {
		this.equipmentFormState$ = this.store.pipe(select(selectEquipmentFormState));
	}

	public loadEquipmentForm(equipment: Equipment): void {
		this.store.dispatch(new LoadEquipmentForm({ equipment }));
	}

	public submitEquipmentForm(equipment: Equipment): void {
		this.store.dispatch(new SubmitEquipmentForm({ equipment }));
	}
}
