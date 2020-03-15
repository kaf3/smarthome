import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadRooms } from '../root-store/room-list-store/actions';
import { IRoom } from '../../models/iroom';
import { filter } from 'rxjs/operators';
import {RoomListStoreSelectors, RoomListStoreState} from '../root-store/room-list-store';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms : IRoom[] = [];

  constructor(private store: Store<RoomListStoreState.RoomListState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadRooms());

    this.store.pipe(
      select(RoomListStoreSelectors.selectRoomList),
      filter(rooms => !!rooms.length),
    ).subscribe(rooms => this.rooms = rooms);
  }

}
