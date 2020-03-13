import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
/* import { filter } from 'rxjs/operators'; */
/* import { GetRoom } from '../store/actions/room.actions';
import { selectAppRouter } from '../../store/selectors/app-router-selectors';
import { map } from 'rxjs/operators'; */
import { selectRoom } from '../store/selectors/room.selector';
import { IRoom } from 'src/models/iroom';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  room: IRoom | undefined;

  ngOnInit(): void {
    this.store.pipe(select(selectRoom)).subscribe(room => this.room = room)
  }

}
