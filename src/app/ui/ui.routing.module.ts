import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomListModule } from './room-list/room-list.module';

const routes: Routes = [
	{
		path: 'rooms',
		loadChildren: (): Promise<RoomListModule> =>
			import('./room-list/room-list.module').then((m) => m.RoomListModule),
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
