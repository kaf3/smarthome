import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EquipmentComponent} from './equipment.component';
import {EquipmentStoreModule} from '../../../../root-store/equipment-store/equipment-store.module';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {EquipmentFormModule} from './equipment-form/equipment-form.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {PipesModule} from '../../../../pipes/pipes.module';

@NgModule({
    declarations: [EquipmentComponent],
    exports: [EquipmentComponent],
    imports: [
        CommonModule,
        EquipmentStoreModule,
        MatCardModule,
        MatListModule,
        EquipmentFormModule,
        MatToolbarModule,
        PipesModule,
    ],
})
export class EquipmentModule {}
