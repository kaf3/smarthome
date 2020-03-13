import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store'
import { StoreDevtoolsModule} from '@ngrx/store-devtools';

import { RouterModule } from '@angular/router';
import { RoomListModule } from './room-list/room-list.module';
import { appRoutes } from './routing/app.routes';
import { DataPersistence } from '@nrwl/angular';
/* import { AppRouterStateSerializer } from './router/app-router-state-serializer'; */


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RoomListModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([]),
     StoreRouterConnectingModule.forRoot({stateKey: 'router', /* serializer: AppRouterStateSerializer */}),
    StoreDevtoolsModule.instrument(),

  ],
  providers: [DataPersistence],
  bootstrap: [AppComponent]
})
export class AppModule { }
