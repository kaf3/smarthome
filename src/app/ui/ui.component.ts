import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '@services';
import { RoomListFacade } from '@store/room-list';

@Component({
	selector: 'app-ui',
	templateUrl: './ui.component.html',
	styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnDestroy, OnInit {
	@ViewChild('sidenav') sideNav: MatSidenav;
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
		private readonly roomListFacade: RoomListFacade,
	) {}

	public onOpen(): void {
		this.sidenavService.setState(true);
	}

	public onClose(): void {
		this.sidenavService.setState(false);
	}

	ngOnInit() {
		this.roomListFacade.loadRooms();
	}

	ngOnDestroy(): void {
		if (this.sidenavService.sidenavSubject) {
			this.sidenavService.sidenavSubject.complete();
		}
	}
}
