import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RootStoreModule } from './root-store.module';
import * as RootStoreState from './reducer';
import { AppState, ROUTER_FEATURE_KEY } from './reducer';

export { RootStoreState, RootStoreModule };

export const selectRouterState = createFeatureSelector<AppState, RouterReducerState>(
	ROUTER_FEATURE_KEY,
);
