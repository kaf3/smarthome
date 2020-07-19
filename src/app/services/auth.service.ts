import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { UserLoggedIn, UserLogIn } from '@models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map, take } from 'rxjs/operators';
import { AuthFacade } from '@store/auth';
import { Router, UrlTree } from '@angular/router';

@Injectable()
export class AuthService {
	constructor(
		private fireAuth: AngularFireAuth,
		private authFacade: AuthFacade,
		private router: Router,
	) {
		this.setSession();
	}

	login(email: UserLogIn['email'], password: UserLogIn['password']): Observable<UserLoggedIn> {
		return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
			map((userCredentials) => ({
				uid: userCredentials?.user?.uid ?? '',
				email: userCredentials?.user?.email ?? '',
			})),
		);
	}

	logout(): Observable<null> {
		return from(this.fireAuth.signOut()).pipe(map(() => null));
	}

	setSession(): void {
		this.fireAuth.authState.pipe(take(1)).subscribe((user) => {
			this.authFacade.initSession(user ? { uid: user.uid, email: user.email ?? '' } : null);
		});
	}

	public isLoggedIn(redirectUrl: string): Observable<boolean | UrlTree> {
		return this.authFacade.authState$.pipe(
			filter((state) => state.isSession),
			take(1),
			map((state) => {
				if (state.user) return true;
				this.authFacade.saveRedirectUrl(redirectUrl);
				return this.router.createUrlTree(['/login']);
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
