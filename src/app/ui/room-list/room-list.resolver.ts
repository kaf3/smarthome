import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { RoomListStoreSelectors, RoomListStoreState } from '@store';
import { EMPTY, Observable, of, race } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class RoomListResolver implements Resolve<any> {
	constructor(private store: Store<RoomListStoreState.RoomListState>) {}

	resolve(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot,
	): Observable<boolean> | Promise<any> | any {
		const loaded$: Observable<boolean> = this.store.pipe(
			select(RoomListStoreSelectors.selectLoaded),
			filter((load: boolean) => load),
		);
		const error$: Observable<string> = this.store.pipe(
			select(RoomListStoreSelectors.selectError),
			filter((error: string) => !!error),
		);
		return race(loaded$, error$).pipe(
			take(1),
			switchMap((result: string | boolean) => {
				return typeof result === 'string' ? EMPTY : of(true);
			}),
		);
	}
}
