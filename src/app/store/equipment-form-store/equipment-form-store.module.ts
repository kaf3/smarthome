import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {equipmentFormReducer} from './reducer';
import {EquipmentFormEffects} from './effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('equipment-form', equipmentFormReducer),
        EffectsModule.forFeature([EquipmentFormEffects]),
    ],
})
export class EquipmentFormStoreModule {}
