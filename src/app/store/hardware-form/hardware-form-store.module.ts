import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HardwareFormEffects } from './effects';
import { hardwareFormFeatureKey, initialHardwareFormState, reducer } from './reducer';
import { HardwareFormFacade } from './facade';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		EffectsModule.forFeature([HardwareFormEffects]),
		StoreModule.forFeature(hardwareFormFeatureKey, reducer, {
			initialState: initialHardwareFormState,
		}),
	],
})
export class HardwareFormStoreModule {
	static forRoot(): ModuleWithProviders<HardwareFormStoreModule> {
		return {
			ngModule: HardwareFormStoreModule,
			providers: [HardwareFormFacade],
		};
	}
}
