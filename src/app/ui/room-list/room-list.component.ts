import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {Room} from 'src/models/room';
import {filter, takeUntil} from 'rxjs/operators';
import {RoomListStoreActions, RoomListStoreSelectors, RoomListStoreState} from '@store';
import {Observable, Subject} from 'rxjs';
import {MatTabNav} from '@angular/material/tabs';
import {SidenavService} from '../../sevices/sidenav.service';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit, OnDestroy {
    @ViewChild('matTabNav') matTabNav: MatTabNav;

    public readonly rooms$: Observable<Room[]>;
    public readonly destroy$ = new Subject();

    constructor(
        private readonly store: Store<RoomListStoreState.RoomListState>,
        private readonly sidenavService: SidenavService,
    ) {
        this.store.dispatch(new RoomListStoreActions.LoadRooms());

        this.rooms$ = this.store.pipe(
            select(RoomListStoreSelectors.selectRoomList),
            filter(rooms => !!rooms.length),
        );
    }

    ngOnInit() {
        this.sidenavService
            .getState()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.alignInkNavBar();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private alignInkNavBar(): void {
        if (!!this.matTabNav) {
            this.matTabNav._alignInkBarToSelectedTab();
        }
    }
}
