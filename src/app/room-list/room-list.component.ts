import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadRooms } from './store/actions/rooms.action';
import { selectRooms } from './store/selectors/rooms.selector';
import { RoomsState } from './store/state/rooms.state';
import { IRoom } from '../../models/iroom';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms : IRoom[] = [];

  constructor(private store: Store<RoomsState>) {}

  ngOnInit() {
    this.store.dispatch(new loadRooms());

    this.store.pipe(
      select(selectRooms),
      filter(rooms => !!rooms.length),
    ).subscribe(rooms => this.rooms = rooms)
  }

}
