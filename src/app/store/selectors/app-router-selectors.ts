import { AppState } from "../state/app.state";
import { createSelector } from '@ngrx/store';
import { AppRoute, appRouteInitial } from '../../router/app-router';


const getRouterReducerState = (state: AppState) => state.router;

export const selectAppRouter = createSelector(getRouterReducerState, (routerState) => {
    if (!!routerState) {
        return <AppRoute>routerState.state
    }
       return appRouteInitial; 
    }
);   

