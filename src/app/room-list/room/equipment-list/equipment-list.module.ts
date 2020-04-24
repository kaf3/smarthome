import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EquipmentListComponent} from './equipment-list.component';
import {EquipmentListStoreModule} from '../../../root-store/equipment-list-store';
import {RouterModule} from '@angular/router';
import {EquipmentModule} from './equipment/equipment.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [EquipmentListComponent],
  exports: [EquipmentListComponent],
  imports: [
    CommonModule,
    EquipmentListStoreModule,
    RouterModule.forChild([]),
    EquipmentModule,
    MatCardModule
  ]
})
export class EquipmentListModule {
}
