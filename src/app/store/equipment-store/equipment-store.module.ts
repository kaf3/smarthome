import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EQUIPMENT_FEATURE_KEY, equipmentReducer, initialState } from './reducer';
import { EquipmentEffects } from './effects';
import { EquipmentFacade } from './facade';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature(EQUIPMENT_FEATURE_KEY, equipmentReducer, {
			initialState,
		}),
		EffectsModule.forFeature([EquipmentEffects]),
	],
})
export class EquipmentStoreModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: EquipmentStoreModule,
			providers: [EquipmentFacade],
		};
	}
}
