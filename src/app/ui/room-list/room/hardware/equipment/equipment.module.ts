import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment.component';
import { PipesModule } from '../../../../../pipes';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
	declarations: [EquipmentComponent],
	imports: [CommonModule, PipesModule, MatExpansionModule, MatListModule, MatCardModule],
	exports: [EquipmentComponent],
})
export class EquipmentModule {}
