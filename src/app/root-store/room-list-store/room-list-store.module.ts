import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RootStoreModule} from '../root-store.module';
import {StoreModule} from '@ngrx/store';
import {roomsReducer} from './reducer';
import {EffectsModule} from '@ngrx/effects';
import {RoomsEffects} from './effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('room-list', roomsReducer),
    EffectsModule.forFeature([RoomsEffects]),
  ]
})
export class RoomListStoreModule { }
