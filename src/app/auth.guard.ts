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
import { Observable } from 'rxjs';
import { AuthFacade } from '@store/auth';
import { AuthService } from '@services';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(
		private authFacade: AuthFacade,
		private router: Router,
		private authService: AuthService,
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> {
		return this.authService.isLoggedIn(state.url);
	}

	canLoad(
		route: Route,
		_segments: UrlSegment[],
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authService.isLoggedIn(route.path ?? '');
	}
}
