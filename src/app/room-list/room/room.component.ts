import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IRoom } from 'src/models/iroom';
import {RoomStoreSelectors, RoomStoreState } from 'src/app/root-store';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private store: Store<RoomStoreState.RoomState>) { }

  room: IRoom | undefined;

  ngOnInit(): void {
    this.store.pipe(select(RoomStoreSelectors.selectRoom))
      .subscribe(room => this.room = room);
  }

}
