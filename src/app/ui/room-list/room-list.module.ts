import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomListComponent} from './room-list.component';
import {RoomListStoreModule} from '@store';
import {RoomModule} from './room/room.module';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {RoomListRoutingModule} from './room-list.routing.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {EffectsModule} from '@ngrx/effects';
import {RoomListUiEffects} from './room-list.ui.effects';

@NgModule({
    declarations: [RoomListComponent],
    exports: [RoomListComponent],
    imports: [
        CommonModule,
        RoomListRoutingModule,
        RoomListStoreModule,
        RoomModule,
        MatCardModule,
        MatTabsModule,
        MatGridListModule,
        MatProgressBarModule,
        EffectsModule.forFeature([RoomListUiEffects]),
    ],
})
export class RoomListModule {}
