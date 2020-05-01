import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomComponent} from './room.component';
import {RoomStoreModule} from 'src/app/root-store/room-store/room-store.module';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RoomRoutingModule} from './room.routing.module';
import {MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {EquipmentModule} from './equipment/equipment.module';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [RoomComponent],
    imports: [
        CommonModule,
        RoomStoreModule,
        EquipmentModule,
        RoomRoutingModule,
        MatToolbarModule,
        MatRippleModule,
        MatCardModule,
        PipesModule,
    ],
    exports: [RouterModule],
})
export class RoomModule {}
