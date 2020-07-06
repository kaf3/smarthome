import { Component, OnInit } from '@angular/core';
import { RoomListFacade } from '@store/room-list';
import { Observable } from 'rxjs';
import { Room } from '@models/room';
import { Hardware } from '@models/hardware';
import { Equipment } from '@models/equipment';
import { Command } from '@models/command';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface FullAboutEquipment {
	room: Room;
	equipment: Equipment;
	hardware: Hardware;
}

@Component({
	selector: 'app-add-command',
	templateUrl: './add-command.component.html',
	styleUrls: ['./add-command.component.scss'],
})
export class AddCommandComponent implements OnInit {
	public rooms$: Observable<Room[]>;
	public command: Command;
	public aboutEventSensor: FullAboutEquipment;
	public aboutResultDevice: FullAboutEquipment;
	public eventForm = new FormGroup({
		equipValue: new FormControl('', Validators.required.bind(Validators)),
		comparator: new FormControl('', Validators.required.bind(Validators)),
	});

	constructor(private readonly roomListFacade: RoomListFacade) {}

	ngOnInit(): void {
		this.rooms$ = this.roomListFacade.rooms$;
	}

	comparisons = [
		{
			sign: '>',
			label: 'больше',
		},
		{
			sign: '<',
			label: 'меньше',
		},
		{
			sign: '=',
			label: 'равно',
		},
	];
}
