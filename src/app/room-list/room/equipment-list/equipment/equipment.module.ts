import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment.component';
import {EquipmentStoreModule} from '../../../../root-store/equipment-store/equipment-store.module';



@NgModule({
  declarations: [EquipmentComponent],
  exports: [EquipmentComponent],
  imports: [
    CommonModule,
    EquipmentStoreModule
  ]
})
export class EquipmentModule { }
