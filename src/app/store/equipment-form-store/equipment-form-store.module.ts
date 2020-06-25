import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EQUIPMENT_FORM_FEATURE_KEY, equipmentFormReducer, initialState } from './reducer';
import { EquipmentFormEffects } from './effects';
import { EquipmentFormFacade } from './facade';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature(EQUIPMENT_FORM_FEATURE_KEY, equipmentFormReducer, {
			initialState,
		}),
		EffectsModule.forFeature([EquipmentFormEffects]),
	],
})
export class EquipmentFormStoreModule {
	static forRoot(): ModuleWithProviders<EquipmentFormStoreModule> {
		return {
			ngModule: EquipmentFormStoreModule,
			providers: [EquipmentFormFacade],
		};
	}
}
