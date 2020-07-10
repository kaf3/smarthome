import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { NgrxMaterialModule } from '@helpers';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '@pipes';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCommandComponent } from './form-command/add/add-command.component';
import { EquipmentModule } from '../room-list/room/hardware/equipment/equipment.module';
import { CommandComponent } from './command/command.component';
import { CommandsRoutingModule } from './commands.routing.module';
import { CommandsComponent } from './commands.component';
import { UpdateCommandComponent } from './form-command/update/update-command.component';

@NgModule({
	declarations: [
		CommandsComponent,
		CommandComponent,
		AddCommandComponent,
		UpdateCommandComponent,
	],
	imports: [
		CommonModule,
		CommandsRoutingModule,
		MatCardModule,
		MatExpansionModule,
		MatListModule,
		NgrxMaterialModule,
		MatButtonModule,
		MatIconModule,
		EquipmentModule,
		PipesModule,
		MatStepperModule,
		MatDialogModule,
		MatMenuModule,
		MatInputModule,
		ReactiveFormsModule,
	],
})
export class CommandsModule {}
