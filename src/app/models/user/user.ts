import { CallState } from '@models/error-loading';

export interface UserLogIn {
	email: string;
	password: string;
}

export interface UserLoggedIn {
	email: string;
	uid: string;
}

export interface AuthState {
	user: UserLoggedIn | null;
	redirectUrl: string;
	callState: CallState;
}
