import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './room-list.component';
import { RoomModule } from './room/room.module';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { RoomListRoutingModule } from './room-list.routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RoomGuard } from './room/room.guard';

@NgModule({
	declarations: [RoomListComponent],
	exports: [RoomListComponent],
	imports: [
		CommonModule,
		RoomListRoutingModule,
		RoomModule,
		MatCardModule,
		MatTabsModule,
		MatGridListModule,
		MatProgressBarModule,
	],
	providers: [RoomGuard],
})
export class RoomListModule {}
