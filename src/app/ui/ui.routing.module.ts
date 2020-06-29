import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomListModule } from './room-list/room-list.module';
import { CommandsModule } from './commands/commands.module';
import { RoomListLoadGuard } from './room-list/room-list.load.guard';
import { CommandListLoadGuard } from './commands/command-list-load.guard';

const routes: Routes = [
	{
		path: 'rooms',
		loadChildren: (): Promise<RoomListModule> =>
			import('./room-list/room-list.module').then((m) => m.RoomListModule),
		canLoad: [RoomListLoadGuard],
	},
	{
		path: 'commands',
		loadChildren: (): Promise<CommandsModule> =>
			import('./commands/commands.module').then((m) => m.CommandsModule),
		canLoad: [CommandListLoadGuard],
	},
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full',
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UiRoutingModule {}
