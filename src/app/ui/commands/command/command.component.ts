import { Component, Input, OnInit } from '@angular/core';
import { Command, CommandDevice, CommandSensor } from '@models/command';
import { RoomListFacade } from '@store/room-list';
import { Observable } from 'rxjs';
import { Room } from '@models/room';
import { Hardware } from '@models/hardware';
import { Equipment } from '@models/equipment';

export interface FullAboutEquipment$ {
	room$: Observable<Room>;
	hardware$: Observable<Hardware>;
	equipment$: Observable<Equipment>;
}

@Component({
	selector: 'app-command',
	templateUrl: './command.component.html',
	styleUrls: ['./command.component.scss'],
})
export class CommandComponent implements OnInit {
	@Input() command: Command;
	public eventSensor: FullAboutEquipment$;
	public resultDevice: FullAboutEquipment$;

	constructor(private readonly roomListFacade: RoomListFacade) {}

	ngOnInit(): void {
		if (!!this.command.body) {
			this.eventSensor = this.aboutEquipment(this.command.body.trigger as CommandSensor); // if command type === byEvent
			this.resultDevice = this.aboutEquipment(this.command.body.result);
		}
	}

	get eventTrigger(): CommandSensor | null {
		return (this.command.body?.trigger as CommandSensor) ?? null;
	}

	private aboutEquipment(ids: CommandSensor | CommandDevice): FullAboutEquipment$ {
		const { roomId, hardwareId, equipmentId } = ids;
		return {
			room$: this.roomListFacade.roomById$(roomId),
			hardware$: this.roomListFacade.hardwareById$(roomId, hardwareId),
			equipment$: this.roomListFacade.equipmentById$(roomId, hardwareId, equipmentId),
		};
	}
}
