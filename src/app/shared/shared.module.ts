import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	EquipmentPartitionService,
	HttpCommandsService,
	HttpRoomsService,
	LoadingService,
	SerializeService,
	SidenavService,
} from '@services';
import { RoomListLoadGuard } from '../ui/room-list/room-list.load.guard';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				HttpRoomsService,
				EquipmentPartitionService,
				SerializeService,
				SidenavService,
				LoadingService,
				RoomListLoadGuard,
				HttpCommandsService,
			],
		};
	}
}
