import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './reducer';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {initialAppState} from './state';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot(appReducers, {initialState: initialAppState}),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
        StoreDevtoolsModule.instrument(),
    ],
})
export class RootStoreModule {}
