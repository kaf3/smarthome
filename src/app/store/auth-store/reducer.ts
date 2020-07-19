import { AuthActions, AuthActionTypes } from './actions';
import { CallState, LoadingState } from '@models/error-loading';
import { UserLoggedIn } from '@models/user';

export const authFeatureKey = 'auth';

export interface AuthState {
	callState: CallState;
	user: UserLoggedIn | null;
	redirectUrl: string | null;
}

export const initialState: AuthState = {
	callState: LoadingState.INIT,
	user: null,
	redirectUrl: null,
};

export function reducer(state = initialState, action: AuthActions): AuthState {
	switch (action.type) {
		case AuthActionTypes.LogIn:
			return { ...state, callState: LoadingState.LOADING };

		case AuthActionTypes.LogInSuccess:
			return {
				...state,
				callState: LoadingState.LOADED,
				user: action.payload.userLoggedIn,
				redirectUrl: null,
			};

		case AuthActionTypes.LogInFailure:
			return { ...state, callState: action.payload };

		case AuthActionTypes.SaveRedirectUrl:
			return { ...state, redirectUrl: action.payload.redirectUrl };

		default:
			return state;
	}
}
