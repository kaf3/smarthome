import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { UserLoggedIn, UserLogIn } from '@models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
	constructor(private fireAuth: AngularFireAuth) {}
	login(email: UserLogIn['email'], password: UserLogIn['password']): Observable<UserLoggedIn> {
		return from(this.fireAuth.signInWithEmailAndPassword(email, password)).pipe(
			map((userCredentials) => ({
				uid: userCredentials?.user?.uid ?? '',
				email: userCredentials?.user?.email ?? '',
			})),
		);
	}

	logout(): Observable<null> {
		return from(this.fireAuth.signOut).pipe(map(() => null));
	}

	static ErrorMessage = {
		'auth/invalid-email': 'Не правильный логин и (или) пароль',
		'auth/user-disabled': 'Пользователь заблокирован',
		'auth/user-not-found': 'Пользователь не найден',
		'auth/wrong-password': 'Не правильный логин и (или) пароль',
	};
}
