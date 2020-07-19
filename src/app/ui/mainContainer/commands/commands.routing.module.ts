import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';
import { CommandListGuard } from './command-list-guard';
import { RoomListGuard } from '../room-list/room-list-guard';

const routes: Routes = [
	{
		path: '',
		component: CommandsComponent,
		canActivate: [RoomListGuard, CommandListGuard],
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CommandsRoutingModule {}
