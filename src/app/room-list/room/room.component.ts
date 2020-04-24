import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Room} from 'src/models/room';
import {RoomStoreSelectors, RoomStoreState} from 'src/app/root-store';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
    room: Room | undefined;

    constructor(private readonly store: Store<RoomStoreState.RoomState>) {}

    ngOnInit(): void {
        this.store
            .pipe(select(RoomStoreSelectors.selectRoom))
            .subscribe(room => (this.room = room));
    }
}
