import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoadingComponent } from './loading/loading.component';
import { UiRoutingModule } from './ui.routing.module';
import { UiComponent } from './ui.component';

@NgModule({
	declarations: [UiComponent, LoadingComponent],
	exports: [UiComponent],
	imports: [
		CommonModule,
		MatSidenavModule,
		MatListModule,
		UiRoutingModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatProgressBarModule,
		OverlayModule,
	],
})
export class UiModule {}
