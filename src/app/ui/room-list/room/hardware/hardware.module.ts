import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HardwareComponent } from './hardware.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from '@pipes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EquipmentFormModule } from './equipment-form/equipment-form.module';

@NgModule({
	declarations: [HardwareComponent],
	imports: [
		CommonModule,
		MatExpansionModule,
		MatListModule,
		PipesModule,
		MatToolbarModule,
		EquipmentFormModule,
	],
})
export class HardwareModule {}
