import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '@services';
import { AuthFacade } from '@store/auth';
import { Observable } from 'rxjs';
import { UserLoggedIn } from '@models/user';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-ui',
	templateUrl: './mainContainer.component.html',
	styleUrls: ['./mainContainer.component.scss'],
})
export class MainContainerComponent implements OnDestroy, OnInit {
	@ViewChild('sidenav') sideNav: MatSidenav;
	user$: Observable<UserLoggedIn | null>;

	title = 'Smart Home';

	sidenavLinks: { name: string; path: string }[] = [
		{
			name: 'Rooms',
			path: 'rooms',
		},
		{
			name: 'Commands',
			path: 'commands',
		},
		{
			name: 'Analytics',
			path: 'analytics',
		},
		{
			name: 'Safety',
			path: 'safety',
		},
	];

	constructor(
		private readonly sidenavService: SidenavService,
		private readonly authFacade: AuthFacade,
	) {}

	public onOpen(): void {
		this.sidenavService.setState(true);
	}

	public onClose(): void {
		this.sidenavService.setState(false);
	}

	public logOut(): void {
		this.authFacade.logOut();
	}

	ngOnInit() {
		this.user$ = this.authFacade.user$.pipe(filter((user) => !!user));
	}

	ngOnDestroy(): void {
		if (this.sidenavService.sidenavSubject) {
			this.sidenavService.sidenavSubject.complete();
		}
	}
}
