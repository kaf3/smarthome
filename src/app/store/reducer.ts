import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './state';

export const appReducers: Partial<ActionReducerMap<AppState, never>> = {
	// не оч понятно сюда добавлять всегда всех редюсеров? и как пофиксить варн без any в дженерике
	router: routerReducer,
};
