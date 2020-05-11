import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomListModule } from './room-list/room-list.module';
import { CommandsModule } from './commands/commands.module';

const routes: Routes = [
	{
		path: 'rooms',
		loadChildren: (): Promise<RoomListModule> =>
			import('./room-list/room-list.module').then((m) => m.RoomListModule),
	},
	{
		path: 'commands',
		loadChildren: (): Promise<CommandsModule> =>
			import('./commands/commands.module').then((m) => m.CommandsModule),
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
