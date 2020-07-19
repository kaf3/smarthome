import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	AuthService,
	EquipmentPartitionService,
	HttpCommandsService,
	HttpRoomsService,
	LoadingService,
	SerializeService,
	SidenavService,
} from '@services';
import { RoomListGuard } from '../ui/mainContainer/room-list/room-list-guard';
import { CommandListGuard } from '../ui/mainContainer/commands/command-list-guard';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class SharedModule {
	static forRoot(): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: [
				HttpRoomsService,
				EquipmentPartitionService,
				SerializeService,
				SidenavService,
				LoadingService,
				RoomListGuard,
				HttpCommandsService,
				CommandListGuard,
				AuthService,
			],
		};
	}
}
