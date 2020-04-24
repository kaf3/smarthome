import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {Room} from 'src/models/room';
import {filter} from 'rxjs/operators';
import {
    RoomListStoreActions,
    RoomListStoreSelectors,
    RoomListStoreState,
} from 'src/app/root-store';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
    rooms: Room[] = [];

    constructor(private readonly store: Store<RoomListStoreState.RoomListState>) {}

    ngOnInit() {
        this.store.dispatch(new RoomListStoreActions.LoadRooms());

        this.store
            .pipe(
                select(RoomListStoreSelectors.selectRoomList),
                filter(rooms => !!rooms.length),
            )
            .subscribe(rooms => (this.rooms = rooms));
    }
}
