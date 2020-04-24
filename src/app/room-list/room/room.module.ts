import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomComponent} from './room.component';
import {RoomStoreModule} from 'src/app/root-store/room-store/room-store.module';
import {RouterModule} from '@angular/router';
import {EquipmentListModule} from './equipment-list/equipment-list.module';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
    declarations: [RoomComponent],
    imports: [
        CommonModule,
        RoomStoreModule,
        EquipmentListModule,
        RouterModule.forChild([]),
        MatToolbarModule,
    ],
})
export class RoomModule {}
