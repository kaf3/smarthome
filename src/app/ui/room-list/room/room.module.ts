import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RoomRoutingModule } from './room.routing.module';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from '@pipes';
import { EffectsModule } from '@ngrx/effects';
import { RoomUiEffects } from './room.ui.effects';
import { HardwareModule } from './hardware/hardware.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { HardwareFormModule } from './hardware-form/hardware-form.module';

@NgModule({
	declarations: [RoomComponent],
	imports: [
		CommonModule,
		HardwareModule,
		HardwareFormModule,
		RoomRoutingModule,
		MatToolbarModule,
		MatRippleModule,
		MatCardModule,
		PipesModule,
		EffectsModule.forFeature([RoomUiEffects]),
		MatExpansionModule,
	],
	exports: [RouterModule],
})
export class RoomModule {}
