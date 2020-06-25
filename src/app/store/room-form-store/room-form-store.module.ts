import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RoomFormStateEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { initialState, reducer, roomFormStateFeatureKey } from './reducer';
import { RoomFormFacade } from './facade';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		EffectsModule.forFeature([RoomFormStateEffects]),
		StoreModule.forFeature(roomFormStateFeatureKey, reducer, { initialState }),
	],
})
export class RoomFormStoreModule {
	static forRoot(): ModuleWithProviders<RoomFormStoreModule> {
		return {
			ngModule: RoomFormStoreModule,
			providers: [RoomFormFacade],
		};
	}
}
