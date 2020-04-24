import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {equipmentListReducer} from './reducer';
import {EquipmentListEffects} from './effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('equipment-list', equipmentListReducer),
        EffectsModule.forFeature([EquipmentListEffects]),
    ],
})
export class EquipmentListStoreModule {}
