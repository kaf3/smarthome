import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	EquipmentPartitionService,
	HttpRoomsService,
	LoadingService,
	SerializeService,
	SidenavService,
} from '@services';
import { EquipmentResolver } from '../ui/room-list/room/equipment/equipment.resolver';
import { RoomResolver } from '../ui/room-list/room/room.resolver';

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
				EquipmentResolver,
				RoomResolver,
				LoadingService,
			],
		};
	}
}
