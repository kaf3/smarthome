import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CustomErrorStateMatcherDirective } from './error-state-matcher';
import { MatListOptionFixDirective } from './mat-list-option-fix';
import { NgrxMatSelectViewAdapter } from './mat-select-view-adapter';

@NgModule({
	declarations: [
		CustomErrorStateMatcherDirective,
		MatListOptionFixDirective,
		NgrxMatSelectViewAdapter,
	],
	imports: [CommonModule, MatSelectModule],
	exports: [
		MatSelectModule,
		CustomErrorStateMatcherDirective,
		MatListOptionFixDirective,
		NgrxMatSelectViewAdapter,
	],
})
export class NgrxMaterialModule {}
