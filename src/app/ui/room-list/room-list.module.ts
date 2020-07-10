import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRoomComponent } from './add-room/add-room.component';
import { HardwareGuard } from './room/hardware/hardware.guard';
import { RoomGuard } from './room/room.guard';
import { RoomListRoutingModule } from './room-list.routing.module';
import { RoomModule } from './room/room.module';
import { RoomListComponent } from './room-list.component';

@NgModule({
	declarations: [RoomListComponent, AddRoomComponent],
	exports: [RoomListComponent],
	imports: [
		CommonModule,
		RoomListRoutingModule,
		RoomModule,
		MatCardModule,
		MatTabsModule,
		MatGridListModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDialogModule,
		ReactiveFormsModule,
	],
	providers: [RoomGuard, HardwareGuard],
})
export class RoomListModule {}
