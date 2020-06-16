import { RootStoreModule } from './root-store.module';
import * as RootStoreState from './reducer';
import { AppState, ROUTER_FEATURE_KEY } from './reducer';
import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export { RootStoreState, RootStoreModule };

export const selectRouterState = createFeatureSelector<AppState, RouterReducerState>(
	ROUTER_FEATURE_KEY,
);
