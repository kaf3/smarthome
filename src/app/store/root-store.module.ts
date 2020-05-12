import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { initialAppState } from './state';
import { FeatureStoreModule } from './feature-store.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FeatureStoreModule,
		StoreModule.forRoot(appReducers, { initialState: initialAppState }),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({
			stateKey: 'router',
			navigationActionTiming: NavigationActionTiming.PostActivation,
		}),
		StoreDevtoolsModule.instrument(),
	],
})
export class RootStoreModule {}
