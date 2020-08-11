import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthState, UserLogIn } from '@models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map, take } from 'rxjs/operators';
import { Router, UrlTree } from '@angular/router';
import { LoadingState } from '@models/error-loading';

@Injectable()
export class AuthService {
	constructor(private fireAuth: AngularFireAuth, private router: Router) {
		this.startSession();
		this._authState.subscribe(console.log);
	}

	private _authState = new BehaviorSubject<AuthState>({
		user: null,
		redirectUrl: '',
		callState: LoadingState.INIT,
	});
	public user$ = this._authState.pipe(map((state) => state.user));
	public isLoggedIn$ = this._authState.pipe(
		filter((state) => state.callState === LoadingState.LOADED),
		map((state) => !!state.user),
	);

	get redirectUrl(): AuthState['redirectUrl'] {
		return this._authState.getValue().redirectUrl;
	}

	get user(): AuthState['user'] {
		return this._authState.getValue().user;
	}

	get authState(): AuthState {
		return this._authState.getValue();
	}

	login(email: UserLogIn['email'], password: UserLogIn['password']): void {
		this.setState({ ...this.authState, callState: LoadingState.INIT });
		this.fireAuth.signInWithEmailAndPassword(email, password).then((user) => {
			user && this.router.navigate([this.authState.redirectUrl || '/rooms']);
		});
		/*		return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
			map((userCredentials) => ({
				uid: userCredentials?.user?.uid ?? '',
				email: userCredentials?.user?.email ?? '',
			})),
		);*/
	}

	setState(authState: AuthState): void {
		this._authState.next({ ...authState });
	}

	logout(): void {
		this.fireAuth.signOut().then(() => {
			this.router.navigate(['/login']);
		});
		//return from(this.fireAuth.signOut()).pipe(map(() => null));
	}
	//не нужен стор, нужно просто брать с файрбейза стейт авторизации
	startSession(): void {
		this.fireAuth.authState.subscribe((user) => {
			this.setState({
				...this.authState,
				user: user && { uid: user.uid, email: user.email ?? '' },
				callState: LoadingState.LOADED,
			});
			//this.authFacade.initSession(user ? { uid: user.uid, email: user.email ?? '' } : null);
		});
	}

	/*	public isLoggedIn(redirectUrl: string): Observable<boolean | UrlTree> {
		return this.authFacade.authState$.pipe(
			filter((state) => state.isSession),
			take(1),
			map((state) => {
				if (state.user) return true;
				this.authFacade.saveRedirectUrl(redirectUrl);
				return this.router.createUrlTree(['/login']);
			}),
		);
	}*/

	/*	public isLoggedIn(): Observable<boolean> {
		return this.authFacade.authState$.pipe(
			filter((state) => state.isSession),
			take(1),
			map((state) => !!state.user),
		);
	}*/

	public manageRoute(prevUrl: string, nextUrl: string): Observable<boolean | UrlTree> {
		return this.isLoggedIn$.pipe(
			take(1),
			map((authorized) => {
				console.log(prevUrl, nextUrl, authorized);
				/*if (!authorized) {
					nextUrl === '/login' || this.authFacade.saveRedirectUrl(nextUrl);
					return nextUrl === '/login' || this.router.createUrlTree(['/login']);
				}
				return nextUrl !== '/login' || this.router.createUrlTree([prevUrl]);*/
				authorized || this.setState({ ...this.authState, redirectUrl: nextUrl });
				return authorized || this.router.createUrlTree(['/login']);
			}),
		);
	}

	public loginNavigate(prevUrl: string): Observable<boolean | UrlTree> {
		return this.isLoggedIn$.pipe(
			take(1),
			map((authorized) => {
				return !authorized || this.router.createUrlTree([prevUrl]);
			}),
		);
	}

	static ErrorMessage = {
		'auth/invalid-email': 'Не правильный логин и (или) пароль',
		'auth/user-disabled': 'Пользователь заблокирован',
		'auth/user-not-found': 'Пользователь не найден',
		'auth/wrong-password': 'Не правильный логин и (или) пароль',
	};
}
