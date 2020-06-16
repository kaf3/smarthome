import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export const ROUTER_FEATURE_KEY = 'router';

export interface AppState {
	router?: RouterReducerState;
}

export const initialAppState: AppState = {};
export const appReducers: Partial<ActionReducerMap<AppState, never>> = {
	router: routerReducer,
};
