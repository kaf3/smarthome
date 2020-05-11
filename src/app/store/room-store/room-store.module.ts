import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { roomReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { RoomEffects } from './effects';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature('room', roomReducer),
		EffectsModule.forFeature([RoomEffects]),
	],
})
export class RoomStoreModule {}
