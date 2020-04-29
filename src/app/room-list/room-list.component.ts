import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {Room} from 'src/models/room';
import {filter} from 'rxjs/operators';
import {RoomListStoreActions, RoomListStoreSelectors, RoomListStoreState} from '@store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
    rooms$: Observable<Room[]>;

    constructor(private readonly store: Store<RoomListStoreState.RoomListState>) {
        this.store.dispatch(new RoomListStoreActions.LoadRooms());

        this.rooms$ = this.store.pipe(
            select(RoomListStoreSelectors.selectRoomList),
            filter(rooms => !!rooms.length),
        );
    }

    ngOnInit() {}
}
