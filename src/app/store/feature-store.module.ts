import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListStoreModule } from '@store/room-list';
import { RoomStoreModule } from '@store/room';
import { EquipmentStoreModule } from '@store/equipment';
import { EquipmentFormStoreModule } from '@store/equipment-form';
import { HardwareStoreModule } from '@store/hardware';
import { HardwareFormStoreModule } from '@store/hardware-form';
import { RoomFormStoreModule } from '@store/room-form';
import { CommandListStoreModule } from '@store/command-list';

@NgModule({
	imports: [
		CommonModule,
		RoomListStoreModule.forRoot(),
		RoomStoreModule.forRoot(),
		EquipmentStoreModule.forRoot(),
		EquipmentFormStoreModule.forRoot(),
		HardwareStoreModule.forRoot(),
		HardwareFormStoreModule.forRoot(),
		RoomFormStoreModule.forRoot(),
		CommandListStoreModule.forRoot(),
	],
})
export class FeatureStoreModule {}
