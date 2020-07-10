import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommandsEffects } from './effects';
import { commandListFeatureKey, initialState, reducer } from './reducer';
import { CommandListFacade } from './facade';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		EffectsModule.forFeature([CommandsEffects]),
		StoreModule.forFeature(commandListFeatureKey, reducer, { initialState }),
	],
})
export class CommandListStoreModule {
	static forRoot(): ModuleWithProviders<CommandListStoreModule> {
		return {
			ngModule: CommandListStoreModule,
			providers: [CommandListFacade],
		};
	}
}
