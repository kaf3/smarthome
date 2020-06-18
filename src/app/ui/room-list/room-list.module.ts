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
import { HardwareGuard } from './room/hardware/hardware.guard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddRoomComponent } from './add-room/add-room.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

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
