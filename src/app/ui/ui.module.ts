import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiComponent} from './ui.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {UiRoutingModule} from './ui.routing.module';
import {RoomListModule} from './room-list/room-list.module';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {SidenavService} from '../services/sidenav.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
    declarations: [UiComponent],
    exports: [UiComponent],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatListModule,
        UiRoutingModule,
        RoomListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatProgressBarModule,
    ],
    providers: [SidenavService],
})
export class UiModule {}
