import { Injectable } from '@angular/core';
import { AppState } from '../state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterReducerState } from '@ngrx/router-store';
import { selectRouterState } from './selectors';

@Injectable()
export class RouterFacade {
	public readonly routerState$: Observable<RouterReducerState>;

	constructor(public readonly store: Store<AppState>) {
		this.routerState$ = this.store.select(selectRouterState);
	}
}
