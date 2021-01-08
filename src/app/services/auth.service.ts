import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthState, UserLogIn } from '@models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map, take } from 'rxjs/operators';
import { Router, UrlTree } from '@angular/router';
import { LoadingState } from '@models/error-loading';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
	constructor(
		private fireAuth: AngularFireAuth,
		private router: Router,
		private readonly snackBar: MatSnackBar,
	) {
		this.startSession();
	}
	//набор ошибок
	static ErrorMessage = {
		'auth/invalid-email': 'Не правильный логин и (или) пароль',
		'auth/user-disabled': 'Пользователь заблокирован',
		'auth/user-not-found': 'Пользователь не найден',
		'auth/wrong-password': 'Не правильный логин и (или) пароль',
	};
	private _authState = new BehaviorSubject<AuthState>({
		user: null,
		redirectUrl: '',
		callState: LoadingState.INIT,
	});
	public user$ = this._authState.pipe(map((state) => state.user));
	public isAuthorized$ = this._authState.pipe(
		filter((state) => state.callState === LoadingState.LOADED),
		map((state) => !!state.user),
	);
	//состояние авторизации
	get authState(): AuthState {
		return this._authState.getValue();
	}
	//произвести вход в аккаунт
	login(email: UserLogIn['email'], password: UserLogIn['password']): void {
		this.setState({ callState: LoadingState.LOADING });
		this.fireAuth
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				const url = this.authState.redirectUrl;
				user && this.router.navigate([url || '/']);
			})
			.catch(({ code }) => {
				this.openSnackBar(AuthService.ErrorMessage[code] ?? 'Неизвестная ошибка', 'Error');
			});
	}
	//задать состояние
	setState(authState: Partial<AuthState>): void {
		this._authState.next({ ...this.authState, ...authState });
	}
	//выйти из аккаунта
	logout(): void {
		this.setState({ callState: LoadingState.LOADING });

		this.fireAuth
			.signOut()
			.then(() => {
				//this.router.navigate(['/login']);
			})
			.catch(({ code }) => {
				this.openSnackBar(AuthService.ErrorMessage[code] ?? 'Неизвестная ошибка', 'Error');
			});

		this.isAuthorized$
			.pipe(
				filter((authorized) => !authorized),
				take(1),
			)
			.subscribe(() => {
				this.router.navigate(['/login']);
			});
	}
	//начать сессию
	startSession(): void {
		this.fireAuth.authState.subscribe((user) => {
			this.setState({
				user: user && { uid: user.uid, email: user.email ?? '' },
				callState: LoadingState.LOADED,
			});
		});
	}
	//запомнить какая была страница перед переходом на страницу входа
	public manageRoute(prevUrl: string, nextUrl: string): Observable<boolean | UrlTree> {
		return this.isAuthorized$.pipe(
			take(1),
			map((authorized) => {
				authorized || this.setState({ redirectUrl: nextUrl });
				return authorized || this.router.createUrlTree(['/login']);
			}),
		);
	}
	//вернуться на страницу с которой произошел уход после успешной авторизации
	public loginNavigate(prevUrl: string): Observable<boolean | UrlTree> {
		return this.isAuthorized$.pipe(
			take(1),
			map((authorized) => {
				return !authorized || this.router.createUrlTree([prevUrl]);
			}),
		);
	}
	//показать сообщение ошибки
	private openSnackBar(message: string, action: string): void {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}
}
