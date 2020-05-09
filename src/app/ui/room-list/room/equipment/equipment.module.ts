import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EquipmentComponent} from './equipment.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {EquipmentFormModule} from './equipment-form/equipment-form.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {PipesModule} from '@pipes';
import {EffectsModule} from '@ngrx/effects';
import {EquipmentUiEffects} from './equipment.ui.effects';

@NgModule({
    declarations: [EquipmentComponent],
    exports: [EquipmentComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatListModule,
        EquipmentFormModule,
        MatToolbarModule,
        PipesModule,
        EffectsModule.forFeature([EquipmentUiEffects]),
    ],
})
export class EquipmentModule {}
