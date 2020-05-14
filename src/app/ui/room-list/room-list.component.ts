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

import { Room } from 'src/app/models/room';
import { filter, takeUntil } from 'rxjs/operators';
import { RoomListFacade } from '@store/room-list';
import { combineLatest, Observable, Subject } from 'rxjs';
import { MatTabNav } from '@angular/material/tabs';
import { SidenavService } from '@services';
import { CallState } from '@models';

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

		this.sidenavService
			.getState()
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				this.alignInkNavBar();
			});
	}

	ngAfterViewInit(): void {
		this.autoRouterLinkActive();
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

	private autoRouterLinkActive(): void {
		combineLatest([this.rl.changes, this.rooms$, this.roomListFacade.init$] as [
			Observable<QueryList<ElementRef>>,
			Observable<Room[]>,
			Observable<CallState>,
		])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([rlQueryList, _r, _i]) => {
				rlQueryList.first.nativeElement.click();
			});
	}
}
