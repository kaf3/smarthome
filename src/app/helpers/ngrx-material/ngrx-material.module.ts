import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomErrorStateMatcherDirective } from './error-state-matcher';
import { MatListOptionFixDirective } from './mat-list-option-fix';
import { NgrxMatSelectViewAdapter } from './mat-select-view-adapter';
import { MatSelectModule } from '@angular/material/select';

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
