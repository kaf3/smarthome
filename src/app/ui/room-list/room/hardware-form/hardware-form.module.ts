import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxFormsModule } from 'ngrx-forms';
import { MatInputModule } from '@angular/material/input';
import { NgrxMaterialModule } from '@helpers';
import { MatButtonModule } from '@angular/material/button';
import { HardwareFormComponent } from './hardware-form.component';

@NgModule({
	declarations: [HardwareFormComponent],
	imports: [CommonModule, NgrxFormsModule, NgrxMaterialModule, MatInputModule, MatButtonModule],
	exports: [HardwareFormComponent],
})
export class HardwareFormModule {}
