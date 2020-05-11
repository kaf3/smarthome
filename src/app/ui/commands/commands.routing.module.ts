import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';

const routes: Routes = [
	{
		path: '',
		component: CommandsComponent,
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CommandsRoutingModule {}
