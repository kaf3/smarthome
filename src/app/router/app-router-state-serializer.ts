import { RouterStateSerializer } from '@ngrx/router-store';
import { AppRoute } from './app-router';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Params, Data } from '@angular/router';

export class AppRouterStateSerializer implements RouterStateSerializer<AppRoute> {
    serialize(routerState: RouterStateSnapshot): AppRoute {
        return {
          url: routerState.url,
          params: mergeRouteParams(routerState.root, r => r.params),
          queryParams: mergeRouteParams(routerState.root, r => r.queryParams),
          data: mergeRouteData(routerState.root)
        };
      }
    }
    
    function mergeRouteParams(route: ActivatedRouteSnapshot | null, getter: (r: ActivatedRouteSnapshot) => Params): Params {
      if (!route) {
        return {};
      }
      const currentParams = getter(route);
      const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
      return {...currentParams, ...mergeRouteParams(primaryChild, getter)};
    }
    
    function mergeRouteData(route: ActivatedRouteSnapshot | null): Data {
      if (!route) {
        return {};
      }
    
      const currentData = route.data;
      const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
      return {...currentData, ...mergeRouteData(primaryChild)};
    }