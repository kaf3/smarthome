import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, initialState, reducer } from './reducer';
import { AuthFacade } from './facade';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		EffectsModule.forFeature([AuthEffects]),
		StoreModule.forFeature(authFeatureKey, reducer, { initialState }),
	],
})
export class AuthStoreModule {
	static forRoot(): ModuleWithProviders<AuthStoreModule> {
		return {
			ngModule: AuthStoreModule,
			providers: [AuthFacade],
		};
	}
}
