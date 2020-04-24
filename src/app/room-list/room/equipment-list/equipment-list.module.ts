import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EquipmentListComponent} from './equipment-list.component';
import {EquipmentListStoreModule} from '../../../root-store/equipment-list-store';
import {RouterModule} from '@angular/router';
import {EquipmentModule} from './equipment/equipment.module';
import {MatCardModule} from '@angular/material/card';
import {EquipmentListRoutingModule} from './equipment-list.routing.module';

@NgModule({
    declarations: [EquipmentListComponent],
    exports: [EquipmentListComponent],
    imports: [
        CommonModule,
        EquipmentListStoreModule,
        EquipmentListRoutingModule,
        EquipmentModule,
        MatCardModule,
    ],
})
export class EquipmentListModule {}
