import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoomListComponent } from './room-list.component';
import { RoomComponent } from './room/room.component';
import { RouterModule } from '@angular/router';
import {RoomListStoreModule} from '../root-store/room-list-store';
import {RoomModule} from './room/room.module';


@NgModule({
  declarations: [RoomListComponent],
  exports: [RoomListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([]),
    RoomListStoreModule,
    RoomModule
  ]
})
export class RoomListModule { }
