import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Room} from 'src/models/room';
import {RoomStoreSelectors, RoomStoreState} from 'src/app/root-store';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
    room$: Observable<Room>;

    constructor(private readonly store: Store<RoomStoreState.RoomState>) {}

    ngOnInit(): void {
        this.room$ = this.store.pipe(
            select(RoomStoreSelectors.selectRoom),
            filter(room => !!room),
        );
    }
}
