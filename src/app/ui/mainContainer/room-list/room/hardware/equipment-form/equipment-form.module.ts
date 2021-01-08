import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgrxFormsModule } from 'ngrx-forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgrxMaterialModule } from '@helpers';
import { EquipmentFormComponent } from './equipment-form.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
	declarations: [EquipmentFormComponent],
	exports: [EquipmentFormComponent],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSlideToggleModule,
		NgrxFormsModule,
		MatButtonModule,
		MatCardModule,
		FormsModule,
		NgrxMaterialModule,
		MatSliderModule,
	],
})
export class EquipmentFormModule {}
