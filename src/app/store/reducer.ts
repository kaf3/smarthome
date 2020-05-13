import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './state';
import { routerReducer } from '@ngrx/router-store';

export const appReducers: Partial<ActionReducerMap<AppState, never>> = {
	router: routerReducer,
};
