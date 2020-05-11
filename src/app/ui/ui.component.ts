import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '@services';

@Component({
	selector: 'app-ui',
	templateUrl: './ui.component.html',
	styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnDestroy {
	@ViewChild('sidenav') sideNav: MatSidenav;
	title = 'Smart Home';

	constructor(private readonly sidenavService: SidenavService) {}

	public onOpen(): void {
		this.sidenavService.setState(true);
	}

	public onClose(): void {
		this.sidenavService.setState(false);
	}

	ngOnDestroy(): void {
		if (this.sidenavService.sidenavSubject) {
			this.sidenavService.sidenavSubject.complete();
		}
	}
}
