import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RoomListComponent} from './room-list.component';
import {RoomListStoreModule} from '@store';
import {RoomModule} from './room/room.module';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {RoomListRoutingModule} from './room-list.routing.module';

@NgModule({
    declarations: [RoomListComponent],
    exports: [RoomListComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        RoomListRoutingModule,
        RoomListStoreModule,
        RoomModule,
        MatCardModule,
        MatTabsModule,
        MatGridListModule,
    ],
})
export class RoomListModule {}
