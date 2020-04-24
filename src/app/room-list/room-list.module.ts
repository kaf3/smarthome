import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoomListComponent } from './room-list.component';
import { RouterModule } from '@angular/router';
import {RoomListStoreModule} from '../root-store';
import {RoomModule} from './room/room.module';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [RoomListComponent],
  exports: [RoomListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([]),
    RoomListStoreModule,
    RoomModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule
  ]
})
export class RoomListModule { }
