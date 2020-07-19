import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	AuthActions,
	AuthActionTypes,
	LogIn,
	LogInFailure,
	LogInSuccess,
	LogOut,
	LogOutFailure,
	LogOutSuccess,
} from './actions';
import { catchError, map, switchMap, switchMapTo } from 'rxjs/operators';
import { AuthService } from '@services';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorEffects } from '@models/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects extends ErrorEffects {
	logIn$ = createEffect(() =>
		this.actions$.pipe(
			ofType<LogIn>(AuthActionTypes.LogIn),
			switchMap((action) => {
				const { email, password } = action.payload.userLogIn;
				return this.authService.login(email, password).pipe(
					map((user) => {
						this.router.navigate([action.payload.redirectUrl || '/rooms']);
						return new LogInSuccess({ userLoggedIn: user });
					}),
					catchError((error) => {
						return of(
							new LogInFailure({ errorMsg: AuthService.ErrorMessage[error?.code] }),
						);
					}),
				);
			}),
		),
	);

	logOut$ = createEffect(() =>
		this.actions$.pipe(
			ofType<LogOut>(AuthActionTypes.LogOut),
			switchMapTo(
				this.authService.logout().pipe(
					map(() => new LogOutSuccess({ userLoggedIn: null })),
					catchError(() => of(new LogOutFailure({ errorMsg: 'Не удалось выйти' }))),
				),
			),
		),
	);

	redirectToLogin$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<LogOutSuccess>(AuthActionTypes.LogOutSuccess),
				map(() => {
					this.router.navigate(['/login']);
				}),
			),
		{ dispatch: false },
	);

	errorHandler = this.createErrorHandler(AuthActionTypes.LogInFailure);

	constructor(
		readonly actions$: Actions<AuthActions>,
		private authService: AuthService,
		private router: Router,
		readonly snackBar: MatSnackBar,
	) {
		super(snackBar, actions$);
	}
}
