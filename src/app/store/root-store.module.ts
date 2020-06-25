import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducers, initialAppState, ROUTER_FEATURE_KEY } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import {
	NavigationActionTiming,
	StoreRouterConnectingModule,
	DefaultRouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
