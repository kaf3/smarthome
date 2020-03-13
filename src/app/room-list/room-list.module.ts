import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoomsEffects } from './store/effects/rooms.effects';
import { HttpClientModule } from '@angular/common/http';
import { RoomListComponent } from './room-list.component';
import { roomsAndRoomReducer } from './store/reducers/rooms.reducers';
import { RoomComponent } from './room/room.component';
import { RouterModule } from '@angular/router';
import { RoomEffects } from './store/effects/room.effects';






@NgModule({
  declarations: [RoomListComponent, RoomComponent],
  exports: [RoomListComponent, RoomComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([]),
    StoreModule.forFeature('room-list', roomsAndRoomReducer),

    EffectsModule.forFeature([RoomsEffects, RoomEffects]),
  ]
})
export class RoomListModule { }
