import { Component, OnInit } from '@angular/core';
import { RoomListFacade } from '@store/room-list';
import { Observable } from 'rxjs';
import { Room } from '@models/room';
import { Hardware } from '@models/hardware';
import { Equipment } from '@models/equipment';
import { Command, CommandBody } from '@models/command';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommandListFacade } from '@store/command-list';

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
		sensorValue: new FormControl('', Validators.required.bind(Validators)),
		comparator: new FormControl('', Validators.required.bind(Validators)),
	});
	public resultForm = new FormGroup({
		deviceValue: new FormControl(false, Validators.required.bind(Validators)),
	});

	constructor(
		private readonly roomListFacade: RoomListFacade,
		private readonly commandListFacade: CommandListFacade,
	) {}

	ngOnInit(): void {
		this.rooms$ = this.roomListFacade.rooms$;
	}

	get sensorValueControl(): AbstractControl | null {
		return this.eventForm.get('sensorValue');
	}

	get comparatorControl(): AbstractControl | null {
		return this.eventForm.get('comparator');
	}

	get deviceValueControl(): AbstractControl | null {
		return this.resultForm.get('deviceValue');
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

	createAboutEquipment(
		stage: 'event' | 'result',
		room: Room,
		hardware: Hardware,
		equipment: Equipment,
	): void {
		if (stage === 'event') this.aboutEventSensor = { room, hardware, equipment };
		if (stage === 'result') this.aboutResultDevice = { room, hardware, equipment };
	}

	addCommand(): void {
		if (
			this.eventForm.valid &&
			this.resultForm.valid &&
			this.comparatorControl?.value &&
			this.sensorValueControl?.value
		) {
			const body: CommandBody = {
				trigger: {
					equipmentId: this.aboutEventSensor.equipment.id,
					hardwareId: this.aboutEventSensor.hardware.id,
					roomId: this.aboutEventSensor.room.id,
					comparator: this.comparatorControl?.value,
					value: this.sensorValueControl?.value,
				},
				result: {
					equipmentId: this.aboutResultDevice.equipment.id,
					hardwareId: this.aboutResultDevice.hardware.id,
					roomId: this.aboutResultDevice.room.id,
					value: !!this.deviceValueControl?.value,
				},
			};

			this.commandListFacade.addCommand(new Command({ name: 'Test', body, id: null }));
		}
	}
}
