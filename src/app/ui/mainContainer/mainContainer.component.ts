import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService, SidenavService } from '@services';
import { Observable, Subject } from 'rxjs';
import { UserLoggedIn } from '@models/user';
import { filter, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EditComponent } from '../edit/edit.component';
import { CurtainRef, CurtainService } from '../curtain/curtain.component';

@Component({
	selector: 'app-ui',
	templateUrl: './mainContainer.component.html',
	styleUrls: ['./mainContainer.component.scss'],
})
export class MainContainerComponent implements OnDestroy, OnInit {
	@ViewChild('sidenav') sideNav: MatSidenav;
	user$: Observable<UserLoggedIn | null>;
	destroy$ = new Subject();

	curtainRef: CurtainRef | undefined;

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
		private readonly authService: AuthService,
		private readonly router: Router,
		public readonly curtainService: CurtainService<EditComponent>,
	) {}

	public onToggle(value: boolean): void {
		this.sidenavService.setState(value);
	}

	public logOut(): void {
		this.authService.logout();
	}

	onCurtainOpen(): void {
		this.curtainRef = this.curtainService.open(EditComponent, { data: 'hello' });

		this.curtainRef
			.backdropClickEvent()
			.pipe(takeUntil(this.destroy$))
			.subscribe((_) => this.curtainRef?.close());
	}

	onCurtainClose(): void {
		if (this.curtainRef) {
			this.curtainRef.close();
		}
	}

	onCurtainClosed(): void {
		this.router.navigate(['/home', { outlets: { edit: null } }]).then();
	}

	ngOnInit(): void {
		this.user$ = this.authService.user$.pipe(filter((user) => !!user));
	}

	ngOnDestroy(): void {
		if (this.sidenavService.sidenavSubject) {
			this.sidenavService.sidenavSubject.complete();
		}

		this.destroy$.next();
		this.destroy$.complete();
	}
}
