import { Injectable } from '@angular/core';
import { LoadableFacade } from '@models/common';
import { AuthState } from './reducer';
import { select, Store } from '@ngrx/store';
import { selectCallState, selectRedirectUrl, selectUser } from './selectors';
import { Observable } from 'rxjs';
import { UserLoggedIn, UserLogIn } from '@models/user';
import { LogIn, LogOut, SaveRedirectUrl } from './actions';

@Injectable()
export class AuthFacade extends LoadableFacade<AuthState> {
	public user$: Observable<UserLoggedIn | null>;
	public redirectUrl$: Observable<string | null>;

	constructor(store: Store<AuthState>) {
		super(store, selectCallState);

		this.user$ = this.store.pipe(select(selectUser));
		this.redirectUrl$ = this.store.pipe(select(selectRedirectUrl));
	}

	public logIn(userLogIn: UserLogIn, redirectUrl: string | null): void {
		this.store.dispatch(new LogIn({ userLogIn, redirectUrl }));
	}

	public logOut(): void {
		this.store.dispatch(new LogOut());
	}

	public saveRedirectUrl(redirectUrl: string): void {
		this.store.dispatch(new SaveRedirectUrl({ redirectUrl }));
	}
}
