import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
	DefaultRouterStateSerializer,
	NavigationActionTiming,
	StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers, initialAppState, ROUTER_FEATURE_KEY } from './reducer';
import { FeatureStoreModule } from './feature-store.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FeatureStoreModule,
		StoreModule.forRoot(appReducers, { initialState: initialAppState }),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({
			serializer: DefaultRouterStateSerializer,
			stateKey: ROUTER_FEATURE_KEY,
			navigationActionTiming: NavigationActionTiming.PostActivation,
		}),
		StoreDevtoolsModule.instrument(),
	],
})
export class RootStoreModule {}
