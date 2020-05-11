import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { roomsReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { RoomsEffects } from './effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature('room-list', roomsReducer),
		EffectsModule.forFeature([RoomsEffects]),
		MatSnackBarModule,
	],
})
export class RoomListStoreModule {}
