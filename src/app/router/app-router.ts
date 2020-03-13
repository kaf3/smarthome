import {Data, Params} from '@angular/router';
import {RouterReducerState} from '@ngrx/router-store';
export interface AppRoute {
  url: string;
  queryParams: Params;
  params: Params;
  data: Data;
}
export type AppRouterReducerState = RouterReducerState<AppRoute>;

export const appRouteInitial : AppRoute = {
  url: "",
  queryParams: {},
  params: {},
  data: {}
}