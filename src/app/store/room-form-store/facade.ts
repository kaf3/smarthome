import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoomFormState, RoomFormValue } from './reducer';
import { selectRoomFormState } from './selectors';
import { LoadRoomForm, SubmitRoomForm } from './actions';

@Injectable()
export class RoomFormFacade {
	public readonly roomFormState$: Observable<RoomFormState>;

	constructor(private readonly store: Store<RoomFormState>) {
		this.roomFormState$ = this.store.pipe(select(selectRoomFormState));
	}

	loadRoomForm(value: RoomFormValue): void {
		this.store.dispatch(new LoadRoomForm({ value }));
	}

	submitRoomForm(): void {
		this.store.dispatch(new SubmitRoomForm());
	}
}
