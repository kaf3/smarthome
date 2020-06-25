import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HardwareEffects } from './effects';
import { StoreModule } from '@ngrx/store';

import { HardwareFacade } from './facade';
import { hardwareFeatureKey, initialState, reducer } from './reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		EffectsModule.forFeature([HardwareEffects]),
		StoreModule.forFeature(hardwareFeatureKey, reducer, {
			initialState,
		}),
	],
})
export class HardwareStoreModule {
	static forRoot(): ModuleWithProviders<HardwareStoreModule> {
		return {
			ngModule: HardwareStoreModule,
			providers: [HardwareFacade],
		};
	}
}
