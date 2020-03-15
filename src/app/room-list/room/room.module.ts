import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomComponent} from './room.component';
import {RoomStoreModule} from '../../root-store/room-store';



@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    RoomStoreModule
  ]
})
export class RoomModule { }
