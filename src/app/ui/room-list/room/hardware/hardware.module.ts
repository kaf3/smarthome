import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HardwareComponent } from './hardware.component';
import { EffectsModule } from '@ngrx/effects';
import { HardwareUiEffects } from './hardware.ui.effects';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from '@pipes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EquipmentFormModule } from '../equipment/equipment-form/equipment-form.module';

@NgModule({
	declarations: [HardwareComponent],
	imports: [
		CommonModule,
		EffectsModule.forFeature([HardwareUiEffects]),
		MatExpansionModule,
		MatListModule,
		PipesModule,
		MatToolbarModule,
		EquipmentFormModule,
	],
})
export class HardwareModule {}
