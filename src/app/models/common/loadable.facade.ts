import { AppState } from '../../store/state';
import { MemoizedSelector, select, Store } from '@ngrx/store';
import { valueof } from './utility-types';
import { Observable } from 'rxjs';
import { CallState } from '../error-loading/error.loading';
import { filter, map } from 'rxjs/operators';
import { getError, isInit, isLoaded, isLoading } from '@helpers';

export abstract class LoadableFacade<TFeatureState extends valueof<AppState>> {
	public readonly callState$: Observable<CallState>;
	public readonly init$: Observable<CallState>;
	public readonly loading$: Observable<CallState>;
	public readonly loaded$: Observable<CallState>;
	public readonly error$: Observable<string | null>;

	protected constructor(
		protected readonly store: Store<AppState>,
		callStateSelector: MemoizedSelector<AppState, any>,
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
