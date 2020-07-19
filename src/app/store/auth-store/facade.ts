import { Injectable } from '@angular/core';
import { LoadableFacade } from '@models/common';
import { AuthState } from './reducer';
import { select, Store } from '@ngrx/store';
import { selectAuthState, selectCallState, selectRedirectUrl, selectUser } from './selectors';
import { Observable } from 'rxjs';
import { UserLoggedIn, UserLogIn } from '@models/user';
import { InitSession, LogIn, LogOut, SaveRedirectUrl } from './actions';

@Injectable()
export class AuthFacade extends LoadableFacade<AuthState> {
	public user$: Observable<UserLoggedIn | null>;
	public redirectUrl$: Observable<string | null>;
	public authState$: Observable<AuthState>;

	constructor(store: Store<AuthState>) {
		super(store, selectCallState);

		this.user$ = this.store.pipe(select(selectUser));
		this.redirectUrl$ = this.store.pipe(select(selectRedirectUrl));
		this.authState$ = this.store.pipe(select(selectAuthState));
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

	public initSession(userLoggedIn: UserLoggedIn | null): void {
		this.store.dispatch(new InitSession({ userLoggedIn }));
	}
}
