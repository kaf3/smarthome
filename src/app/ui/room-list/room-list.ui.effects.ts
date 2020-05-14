import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RoomListFacade } from '@store/room-list';
import { AppState } from 'src/app/store/state';

@Injectable()
export class RoomListUiEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly router: Router,
		private readonly roomListFacade: RoomListFacade,
		private readonly store: Store<AppState>,
	) {}
}
