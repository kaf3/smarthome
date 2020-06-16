import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HardwareFormState } from './reducer';
import { select, Store } from '@ngrx/store';
import { selectHardwareFormState } from './selectors';
import { LoadHardwareForm, SubmitHardwareForm } from './actions';

@Injectable()
export class HardwareFormFacade {
	public readonly hardwareFormState$: Observable<HardwareFormState>;

	constructor(private readonly store: Store<HardwareFormState>) {
		this.hardwareFormState$ = this.store.pipe(select(selectHardwareFormState));
	}

	public loadHardwareForm(): void {
		this.store.dispatch(new LoadHardwareForm());
	}

	public submitHardwareForm(): void {
		this.store.dispatch(new SubmitHardwareForm());
	}
}
