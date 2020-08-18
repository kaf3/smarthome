import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterModule,
	RouterStateSnapshot,
	Routes,
	UrlTree,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@services';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoginGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> {
		return this.authService.loginNavigate(this.router.routerState.snapshot.url);
		//return this.authService.isLoggedIn(state.url);
	}
}

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
		canActivate: [LoginGuard],
	},
];

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatToolbarModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		ReactiveFormsModule,
	],
})
export class LoginModule {}
