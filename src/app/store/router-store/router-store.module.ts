import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { RouterFacade } from './facade';
import { ROUTER_FEATURE_KEY } from './selectors';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(ROUTER_FEATURE_KEY, routerReducer),
		EffectsModule.forFeature([]),
	],
})
export class RouterStoreModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: RouterStoreModule,
			providers: [RouterFacade],
		};
	}
}
