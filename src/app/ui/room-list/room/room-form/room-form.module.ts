import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomFormComponent } from './room-form.component';
import { NgrxMaterialModule } from '@helpers';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgrxFormsModule } from 'ngrx-forms';

@NgModule({
	declarations: [RoomFormComponent],
	imports: [CommonModule, NgrxMaterialModule, MatInputModule, MatButtonModule, NgrxFormsModule],
	exports: [RoomFormComponent],
})
export class RoomFormModule {}
