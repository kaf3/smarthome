import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MainContainerComponent } from './mainContainer.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [MainContainerComponent],
	exports: [MainContainerComponent],
	imports: [
		CommonModule,
		MatSidenavModule,
		MatListModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatProgressBarModule,
		OverlayModule,
		MatMenuModule,
		RouterModule.forChild([]),
	],
})
export class MainContainerModule {}
