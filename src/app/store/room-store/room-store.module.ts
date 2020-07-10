import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { initialState, ROOM_FEATURE_KEY, roomReducer } from './reducer';
import { RoomEffects } from './effects';
import { RoomFacade } from './facade';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature(ROOM_FEATURE_KEY, roomReducer, { initialState }),
		EffectsModule.forFeature([RoomEffects]),
	],
})
export class RoomStoreModule {
	static forRoot(): ModuleWithProviders<RoomStoreModule> {
		return {
			ngModule: RoomStoreModule,
			providers: [RoomFacade],
		};
	}
}
