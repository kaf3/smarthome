import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HardwareEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import * as fromHardware from './reducer';
import { HardwareFacade } from './facade';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		EffectsModule.forFeature([HardwareEffects]),
		StoreModule.forFeature(fromHardware.hardwareFeatureKey, fromHardware.reducer, {
			initialState: fromHardware.initialState,
		}),
	],
})
export class HardwareStoreModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: HardwareStoreModule,
			providers: [HardwareFacade],
		};
	}
}
