import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IRoom } from 'src/models/iroom';
import {RoomListStoreSelectors, RootStoreState} from 'src/app/root-store';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private store: Store<RootStoreState.AppState>) { }

  room: IRoom | undefined;

  ngOnInit(): void {
    //this.store.pipe(select(RoomListStoreSelectors.selectRoomList)).subscribe(room => this.room = room);
  }

}
