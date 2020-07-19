import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from '../ui/login/login.module';
import { MainContainerComponent } from '../ui/mainContainer/mainContainer.component';
import { RoomListModule } from '../ui/mainContainer/room-list/room-list.module';
import { CommandsModule } from '../ui/mainContainer/commands/commands.module';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
	{
		path: '',
		component: MainContainerComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'rooms',
				loadChildren: (): Promise<RoomListModule> =>
					import('../ui/mainContainer/room-list/room-list.module').then(
						(m) => m.RoomListModule,
					),
				canLoad: [AuthGuard],
			},
			{
				path: 'commands',
				loadChildren: (): Promise<CommandsModule> =>
					import('../ui/mainContainer/commands/commands.module').then(
						(m) => m.CommandsModule,
					),
				canLoad: [AuthGuard],
			},
		],
	},
	{
		path: 'login',
		loadChildren: (): Promise<LoginModule> =>
			import('../ui/login/login.module').then((m) => m.LoginModule),
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
