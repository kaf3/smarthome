import { Component, OnInit } from '@angular/core';
import { RoomListFacade } from '@store/room-list';
import { Observable } from 'rxjs';
import { Room } from '@models/room';
import { Hardware } from '@models/hardware';
import { Equipment } from '@models/equipment';
import { Command, CommandDevice, CommandSensor } from '@models/command';

@Component({
	selector: 'app-add-command',
	templateUrl: './add-command.component.html',
	styleUrls: ['./add-command.component.scss'],
})
export class AddCommandComponent implements OnInit {
	public rooms$: Observable<Room[]>;
	public command: Command;
	public eventSensor: CommandSensor;
	public resultDevice: CommandDevice;

	constructor(private readonly roomListFacade: RoomListFacade) {}

	ngOnInit(): void {
		this.rooms$ = this.roomListFacade.rooms$;
	}

	selectEventSensor(room: Room, hardware: Hardware, equipment: Equipment): void {
		this.eventSensor.roomId = room.id;
		this.eventSensor.hardwareId = hardware.id;
		this.eventSensor.equipmentId = equipment.id;
	}

	selectResultDevice(room: Room, hardware: Hardware, equipment: Equipment): void {
		this.resultDevice.roomId = room.id;
		this.resultDevice.hardwareId = hardware.id;
		this.resultDevice.equipmentId = equipment.id;
	}
}
