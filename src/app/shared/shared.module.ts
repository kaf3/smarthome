import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	EquipmentPartitionService,
	HttpRoomsService,
	LoadingService,
	SerializeService,
	SidenavService,
} from '@services';
import { RoomListResolver } from '../ui/room-list/room-list.resolver';

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
				RoomListResolver,
			],
		};
	}
}
