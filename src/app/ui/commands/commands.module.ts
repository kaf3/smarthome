import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandsComponent } from './commands.component';
import { CommandsRoutingModule } from './commands.routing.module';

@NgModule({
	declarations: [CommandsComponent],
	imports: [CommonModule, CommandsRoutingModule],
})
export class CommandsModule {}
