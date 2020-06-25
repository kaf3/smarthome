import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandsComponent } from './commands.component';
import { CommandsRoutingModule } from './commands.routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
	declarations: [CommandsComponent],
	imports: [CommonModule, CommandsRoutingModule, MatCardModule],
})
export class CommandsModule {}
