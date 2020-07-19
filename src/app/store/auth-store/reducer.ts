import { AuthActions, AuthActionTypes } from './actions';
import { CallState, LoadingState } from '@models/error-loading';
import { UserLoggedIn } from '@models/user';

export const authFeatureKey = 'auth';

export interface AuthState {
	callState: CallState;
	user: UserLoggedIn | null;
	redirectUrl: string | null;
	isSession: boolean;
}

export const initialState: AuthState = {
	callState: LoadingState.INIT,
	user: null,
	redirectUrl: null,
	isSession: false,
};

export function reducer(state = initialState, action: AuthActions): AuthState {
	switch (action.type) {
		case AuthActionTypes.LogIn:
		case AuthActionTypes.LogOut:
			return { ...state, callState: LoadingState.LOADING };

		case AuthActionTypes.LogInSuccess:
			return {
				...state,
				callState: LoadingState.LOADED,
				user: action.payload.userLoggedIn,
				redirectUrl: null,
			};

		case AuthActionTypes.LogInFailure:
		case AuthActionTypes.LogOutFailure:
			return { ...state, callState: action.payload };

		case AuthActionTypes.LogOutSuccess:
			return { ...state, user: null, callState: LoadingState.LOADED };

		case AuthActionTypes.SaveRedirectUrl:
			return { ...state, redirectUrl: action.payload.redirectUrl };

		case AuthActionTypes.InitSession:
			return { ...state, isSession: true, user: action.payload.userLoggedIn };

		default:
			return state;
	}
}
