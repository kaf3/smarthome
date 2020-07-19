import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from '@pipes';
import { EquipmentComponent } from './equipment.component';

@NgModule({
	declarations: [EquipmentComponent],
	imports: [CommonModule, PipesModule, MatExpansionModule, MatListModule, MatCardModule],
	exports: [EquipmentComponent],
})
export class EquipmentModule {}
