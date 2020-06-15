import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { RoomListComponent } from './room-list.component';
import { RoomGuard } from './room/room.guard';
import { RoomListLoadGuard } from './room-list.load.guard';
import { HardwareComponent } from './room/hardware/hardware.component';
import { HardwareGuard } from './room/hardware/hardware.guard';

const routes: Routes = [
	{
		path: '',
		component: RoomListComponent,
		canDeactivate: [RoomListLoadGuard],
		children: [
			{
				path: ':id',
				component: RoomComponent,
				canDeactivate: [RoomGuard],
				canActivate: [RoomGuard],
				children: [
					{
						path: ':hardwareId',
						component: HardwareComponent,
						canActivate: [HardwareGuard],
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
