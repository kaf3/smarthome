import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RoomListModule } from './room-list/room-list.module';
import { appRoutes } from './routing/app.routes';
import { RootStoreModule } from './root-store/root-store.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RoomListModule,
    RouterModule.forRoot(appRoutes),
    RootStoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
