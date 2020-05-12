import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListStoreModule } from '@store/room-list';
import { RoomStoreModule } from '@store/room';
import { EquipmentStoreModule } from '@store/equipment';
import { EquipmentFormStoreModule } from '@store/equipment-form';
import { RouterStoreModule } from '@store/router';

@NgModule({
	imports: [
		CommonModule,
		RoomListStoreModule.forRoot(),
		RoomStoreModule.forRoot(),
		EquipmentStoreModule.forRoot(),
		EquipmentFormStoreModule.forRoot(),
		RouterStoreModule.forRoot(),
	],
})
export class FeatureStoreModule {}
