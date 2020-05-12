import { AppState, FeatureKey } from '../state';
import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export const ROUTER_FEATURE_KEY: FeatureKey = 'router';
export const selectRouterState = createFeatureSelector<AppState, RouterReducerState>(
	ROUTER_FEATURE_KEY,
);
