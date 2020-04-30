import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RoomListModule} from './room-list/room-list.module';
import {RootStoreModule} from '@store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppRoutingModule} from './app-routing/app.routing.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RoomListModule,
        RootStoreModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
