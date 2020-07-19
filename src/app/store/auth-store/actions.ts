import { Action } from '@ngrx/store';
import { UserLoggedIn, UserLogIn } from '@models/user';

export enum AuthActionTypes {
	LogIn = '[Auth] Log In',
	LogInSuccess = '[Auth] Log In Success',
	LogInFailure = '[Auth] Log In Failure',
	LogOut = '[Auth] Log Out',
	LogOutSuccess = '[Auth] Log Out Success',
	LogOutFailure = '[Auth] Log Out Failure',
	SaveRedirectUrl = '[Auth] Save Redirect Url',
	InitSession = '[Auth] Init Session',
}

export class LogIn implements Action {
	readonly type = AuthActionTypes.LogIn;
	constructor(public payload: { userLogIn: UserLogIn; redirectUrl: string | null }) {}
}

export class LogInSuccess implements Action {
	readonly type = AuthActionTypes.LogInSuccess;
	constructor(public payload: { userLoggedIn: UserLoggedIn }) {}
}

export class LogInFailure implements Action {
	readonly type = AuthActionTypes.LogInFailure;
	constructor(public payload: { errorMsg: string }) {}
}

export class LogOut implements Action {
	readonly type = AuthActionTypes.LogOut;
}

export class LogOutSuccess implements Action {
	readonly type = AuthActionTypes.LogOutSuccess;
	constructor(public payload: { userLoggedIn: null }) {}
}

export class LogOutFailure implements Action {
	readonly type = AuthActionTypes.LogOutFailure;
	constructor(public payload: { errorMsg: string }) {}
}

export class SaveRedirectUrl implements Action {
	readonly type = AuthActionTypes.SaveRedirectUrl;
	constructor(public payload: { redirectUrl: string }) {}
}

export class InitSession implements Action {
	readonly type = AuthActionTypes.InitSession;
	constructor(public payload: { userLoggedIn: UserLoggedIn | null }) {}
}

export type AuthActions =
	| LogIn
	| LogInSuccess
	| LogInFailure
	| LogOut
	| LogOutFailure
	| LogOutSuccess
	| SaveRedirectUrl
	| InitSession;
