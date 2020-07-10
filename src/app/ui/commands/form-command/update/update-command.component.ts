import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RoomListFacade } from '@store/room-list';
import { CommandListFacade } from '@store/command-list';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { Command, CommandSensor } from '@models/command';
import { map, takeUntil } from 'rxjs/operators';
import { Room } from '@models/room';
import { Hardware } from '@models/hardware';
import { Equipment } from '@models/equipment';
import { FormCommandComponent } from '../form-command.component';

@Component({
	selector: 'app-update-command',
	templateUrl: '../addOrUpdate-command.component.html',
	styleUrls: ['../addOrUpdate-command.component.scss'],
})
export class UpdateCommandComponent extends FormCommandComponent implements OnInit, OnDestroy {
	constructor(
		roomListFacade: RoomListFacade,
		commandListFacade: CommandListFacade,
		dialogRef: MatDialogRef<UpdateCommandComponent>,
		actions$: Actions,
		@Inject(MAT_DIALOG_DATA) data: Command,
	) {
		super(roomListFacade, commandListFacade, dialogRef, actions$, data);
	}

	ngOnInit(): void {
		this.superOnInit();
		const filteredCommands$ = this.commandListFacade.commands$.pipe(
			map((commands) => commands.filter((c) => c.id !== this.data.id)),
		);
		this.nameControl?.setAsyncValidators(this.notUniqueValidator<Command>(filteredCommands$));
		if (this.data) {
			this.setValueFromEditingCommand(this.data);
		}
	}

	public setValueFromEditingCommand(command: Command): void {
		this.nameControl?.setValue(command.name);
		const commandBodyTrigger = command.body?.trigger as CommandSensor | undefined;
		this.chosenSensorControl?.setValue(commandBodyTrigger?.equipmentId);
		this.sensorValueControl?.setValue(commandBodyTrigger?.value);
		this.comparatorControl?.setValue(commandBodyTrigger?.comparator);

		this.setAsyncValueFromEditingCommand(command);

		this.chosenDeviceControl?.setValue(command.body?.result.equipmentId);
		console.log(command.body?.result.value);
		this.deviceValueControl?.setValue(command.body?.result.value);
	}

	public setAsyncValueFromEditingCommand(command: Command): void {
		const commandBodyTrigger = command.body?.trigger as CommandSensor | undefined;
		this.rooms$.pipe(takeUntil(this.destroy$)).subscribe((rooms) => {
			let room = rooms.find((r) => r.id === commandBodyTrigger?.roomId);
			let hardware = Room.getHardware(commandBodyTrigger?.hardwareId ?? null, room);
			let equipment = Hardware.getEquipment(
				commandBodyTrigger?.equipmentId ?? null,
				hardware,
			);
			if (room && hardware && equipment)
				this.aboutEventSensor = {
					room: new Room(room),
					hardware: new Hardware(hardware),
					equipment: new Equipment(equipment),
				};
			room = rooms.find((r) => r.id === command.body?.result.roomId);
			hardware = Room.getHardware(command.body?.result.hardwareId ?? null, room);
			equipment = Hardware.getEquipment(command.body?.result.equipmentId ?? null, hardware);
			if (room && hardware && equipment)
				this.aboutResultDevice = {
					room: new Room(room),
					hardware: new Hardware(hardware),
					equipment: new Equipment(equipment),
				};
		});
	}

	submitForm(): Command | null {
		const command = super.submitForm();
		if (command) {
			this.commandListFacade.updateCommand(new Command({ ...command, id: this.data.id }));
			this.checkAndClose(command.name);
		}
		return command;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
