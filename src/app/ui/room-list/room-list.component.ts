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
import { select, Store } from '@ngrx/store';

import { Room } from 'src/app/models/room';
import { filter, takeUntil } from 'rxjs/operators';
import { RoomListStoreSelectors, RoomListStoreState, RoomStoreSelectors } from '@store';
import { combineLatest, Observable, Subject } from 'rxjs';
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
		private readonly store: Store<RoomListStoreState.RoomListState>,
		private readonly sidenavService: SidenavService,
	) {}

	ngOnInit(): void {
		this.rooms$ = this.store.pipe(
			select(RoomListStoreSelectors.selectRoomList),
			filter((rooms) => !!rooms.length),
		);

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
		combineLatest([
			this.rl.changes,
			this.rooms$,
			this.store.select(RoomStoreSelectors.selectInit),
		] as [Observable<QueryList<ElementRef>>, Observable<Room[]>, Observable<boolean>])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([rlQueryList, _, isInit]) => {
				console.log(isInit);
				if (isInit) {
					rlQueryList.first.nativeElement.click();
				}
				console.log('click');
			});
	}
}
