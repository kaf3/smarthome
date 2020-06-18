import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomFormComponent } from './room-form.component';
import { NgrxMaterialModule } from '@helpers';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgrxFormsModule } from 'ngrx-forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [RoomFormComponent],
	imports: [
		CommonModule,
		NgrxMaterialModule,
		MatInputModule,
		MatButtonModule,
		NgrxFormsModule,
		MatTooltipModule,
	],
	exports: [RoomFormComponent],
})
export class RoomFormModule {}
