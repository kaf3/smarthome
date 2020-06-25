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

@NgModule({
	declarations: [CommandsComponent],
	imports: [
		CommonModule,
		CommandsRoutingModule,
		MatCardModule,
		MatExpansionModule,
		MatListModule,
		NgrxMaterialModule,
		MatButtonModule,
		MatIconModule,
	],
})
export class CommandsModule {}
