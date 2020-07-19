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
import { map, take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private authFacade: AuthFacade, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> {
		return this.checkUser(state.url);
	}

	canLoad(
		route: Route,
		_segments: UrlSegment[],
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.checkUser(route.path ?? '');
	}

	public checkUser(redirectUrl: string): Observable<boolean | UrlTree> {
		return this.authFacade.user$.pipe(
			take(1),
			map((user) => {
				if (user) return true;
				this.authFacade.saveRedirectUrl(redirectUrl);
				return this.router.createUrlTree(['/login']);
			}),
		);
	}
}
