import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HardwareFormEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { hardwareFormFeatureKey, reducer } from './reducer';
import { HardwareFormFacade } from './facade';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		EffectsModule.forFeature([HardwareFormEffects]),
		StoreModule.forFeature(hardwareFormFeatureKey, reducer),
	],
})
export class HardwareFormStoreModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: HardwareFormStoreModule,
			providers: [HardwareFormFacade],
		};
	}
}
