import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanLoad,
	Route,
	Router,
	RouterStateSnapshot,
	UrlSegment,
	UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@services';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> {
		return this.authService.manageRoute(this.router.routerState.snapshot.url, state.url);
	}

	canLoad(route: Route, _segments: UrlSegment[]): Observable<boolean | UrlTree> {
		return of(true);
		return this.authService.manageRoute(this.router.routerState.snapshot.url, route.path ?? '');
		//return this.authService.isLoggedIn(route.path ?? '');
	}
}
