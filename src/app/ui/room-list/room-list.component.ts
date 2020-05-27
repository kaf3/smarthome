import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';

import { Room } from '@models/room/room';
import { filter, takeUntil } from 'rxjs/operators';
import { RoomListFacade } from '@store/room-list';
import { Observable, Subject } from 'rxjs';
import { MatTabNav } from '@angular/material/tabs';
import { SidenavService } from '@services';

@Component({
	selector: 'app-room-list',
	templateUrl: './room-list.component.html',
	styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('matTabNav') matTabNav: MatTabNav;
	@ViewChildren('rl', { read: ElementRef }) rl: QueryList<ElementRef>;

	public rooms$: Observable<Room[]>;
	public readonly destroy$ = new Subject();

	constructor(
		private readonly roomListFacade: RoomListFacade,
		private readonly sidenavService: SidenavService,
	) {}

	ngOnInit(): void {
		this.roomListFacade.openRoomList();
		this.rooms$ = this.roomListFacade.rooms$.pipe(filter((rooms) => !!rooms.length));
		this.alignSidenav();
	}

	ngAfterViewInit(): void {
		this.autoSelectRoom();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private alignInkNavBar(): void {
		if (this.matTabNav) {
			this.matTabNav._alignInkBarToSelectedTab();
		}
	}

	private alignSidenav(): void {
		this.sidenavService
			.getState()
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				this.alignInkNavBar();
			});
	}

	private autoSelectRoom(): void {
		this.roomListFacade.roomList$.pipe(takeUntil(this.destroy$)).subscribe((roomList) => {
			if (!!roomList.rooms.length && !roomList.activeRoom.roomName) {
				this.rl.first.nativeElement.click();
			}
		});
	}
}
