import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(fromAuth.authFeatureKey);
export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectCallState = createSelector(selectAuthState, (state) => state.callState);
export const selectRedirectUrl = createSelector(selectAuthState, (state) => state.redirectUrl);
export const selectSession = createSelector(selectAuthState, (state) => state.isSession);
