import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {RoomStoreSelectors, RoomStoreState} from '@store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Equipment, EquipmentGroup} from '@models';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
    public readonly roomName$: Observable<string>;
    public readonly equipmentList$: Observable<Equipment[]>;
    public readonly DEVICE = EquipmentGroup.DEVICE;

    constructor(private readonly store: Store<RoomStoreState.RoomState>) {
        this.roomName$ = this.store.pipe(
            select(RoomStoreSelectors.selectRoomName),
            filter(roomName => !!roomName),
        );
        this.equipmentList$ = this.store.pipe(
            select(RoomStoreSelectors.selectAllEquipmentFromRoom),
        );
    }

    ngOnInit(): void {}
}