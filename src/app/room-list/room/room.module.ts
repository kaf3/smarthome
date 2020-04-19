import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomComponent} from './room.component';
import {RoomStoreModule} from 'src/app/root-store/room-store/room-store.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    RoomStoreModule,
    RouterModule.forChild([]),
  ]
})
export class RoomModule { }
