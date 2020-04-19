import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {equipmentReducer} from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('equipment', equipmentReducer),
    EffectsModule.forFeature([equipmentEffects]),
  ]
})
export class EquipmentStoreModule { }
