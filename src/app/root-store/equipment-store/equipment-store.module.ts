import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {equipmentReducer} from './reducer';
import {EquipmentEffects} from './effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('equipment', equipmentReducer),
        EffectsModule.forFeature([EquipmentEffects]),
    ],
})
export class EquipmentStoreModule {}
