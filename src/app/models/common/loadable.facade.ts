import { MemoizedSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { getError, isInit, isLoaded, isLoading } from '@helpers';
import { CallState } from '../error-loading/error.loading';

export abstract class LoadableFacade<TFeatureState> {
	public readonly callState$: Observable<CallState>;

	public readonly init$: Observable<CallState>;

	public readonly loading$: Observable<CallState>;

	public readonly loaded$: Observable<CallState>;

	public readonly error$: Observable<string | null>;

	protected constructor(
		protected readonly store: Store<TFeatureState>,
		callStateSelector: MemoizedSelector<TFeatureState, CallState>,
	) {
		this.callState$ = this.store.pipe(select(callStateSelector));
		this.init$ = this.callState$.pipe(filter((callState) => isInit({ callState })));
		this.loading$ = this.callState$.pipe(filter((callState) => isLoading({ callState })));
		this.loaded$ = this.callState$.pipe(filter((callState) => isLoaded({ callState })));
		this.error$ = this.callState$.pipe(
			map((callState) => getError({ callState })),
			filter((error) => !!error),
		);
	}
}
