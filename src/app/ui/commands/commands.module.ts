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

@NgModule({
	declarations: [CommandsComponent, CommandComponent],
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
	],
})
export class CommandsModule {}
