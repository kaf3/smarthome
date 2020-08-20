import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListStoreModule } from '@store/room-list';
import { EquipmentFormStoreModule } from '@store/equipment-form';
import { HardwareFormStoreModule } from '@store/hardware-form';
import { RoomFormStoreModule } from '@store/room-form';
import { CommandListStoreModule } from '@store/command-list';

@NgModule({
	imports: [
		CommonModule,
		RoomListStoreModule.forRoot(),
		EquipmentFormStoreModule.forRoot(),
		HardwareFormStoreModule.forRoot(),
		RoomFormStoreModule.forRoot(),
		CommandListStoreModule.forRoot(),
	],
})
export class FeatureStoreModule {}
