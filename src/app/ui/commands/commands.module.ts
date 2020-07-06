import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandsComponent } from './commands.component';
import { CommandsRoutingModule } from './commands.routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { NgrxMaterialModule } from '@helpers';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommandComponent } from './command/command.component';
import { EquipmentModule } from '../room-list/room/hardware/equipment/equipment.module';
import { PipesModule } from '@pipes';
import { AddCommandComponent } from './add-command/add-command.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	declarations: [CommandsComponent, CommandComponent, AddCommandComponent],
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
	],
})
export class CommandsModule {}
