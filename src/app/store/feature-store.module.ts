import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListStoreModule } from './room-list-store';
import { RoomStoreModule } from './room-store';
import { EquipmentStoreModule } from './equipment-store';
import { EquipmentFormStoreModule } from './equipment-form-store';

@NgModule({
	imports: [
		CommonModule,
		RoomListStoreModule,
		RoomStoreModule,
		EquipmentStoreModule,
		EquipmentFormStoreModule,
	],
})
export class FeatureStoreModule {}
