import { Injectable } from '@angular/core';
import { AppState } from '../state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EquipmentFormState } from './state';
import { selectEquipmentFormState } from './selectors';
import { LoadEquipmentForm, SubmitEquipmentForm } from './actions';

@Injectable()
export class EquipmentFormFacade {
	public readonly equipmentFormState$: Observable<EquipmentFormState>;

	constructor(private readonly store: Store<AppState>) {
		this.equipmentFormState$ = this.store.pipe(select(selectEquipmentFormState));
	}

	public loadEquipmentForm(): void {
		this.store.dispatch(new LoadEquipmentForm());
	}

	public submitEquipmentForm(): void {
		this.store.dispatch(new SubmitEquipmentForm());
	}
}
