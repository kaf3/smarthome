import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { RoomListComponent } from './room-list.component';
import { EquipmentComponent } from './room/equipment/equipment.component';
import { RoomListResolver } from './room-list.resolver';

const routes: Routes = [
	{
		path: '',
		component: RoomListComponent,
		resolve: {
			ready: RoomListResolver,
		},
		children: [
			{
				path: ':id',
				component: RoomComponent,
				children: [
					{
						path: ':detail',
						component: EquipmentComponent,
					},
				],
			},
		],
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RoomListRoutingModule {}
