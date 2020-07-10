import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RoomListFacade } from '@store/room-list';
import { Observable, of, Subject } from 'rxjs';
import { Room } from '@models/room';
import { Hardware } from '@models/hardware';
import { Equipment } from '@models/equipment';
import { Command, CommandBody } from '@models/command';
import {
	AbstractControl,
	AsyncValidatorFn,
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { CommandListFacade, CommandListStoreActions } from '@store/command-list';
import { BaseDomain } from '@models/common';
import { catchError, debounceTime, map, take, takeUntil } from 'rxjs/operators';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';

export interface FullAboutEquipment {
	room: Room;
	equipment: Equipment;
	hardware: Hardware;
}

const notUnique: ValidationErrors = { notUnique: true };

@Component({
	selector: 'app-add-command',
	templateUrl: './add-command.component.html',
	styleUrls: ['./add-command.component.scss'],
})
export class AddCommandComponent implements OnInit, OnDestroy {
	public rooms$: Observable<Room[]>;
	public roomsOnlyWithSensors$: Observable<Room[]>;
	public roomsOnlyWithDevices$: Observable<Room[]>;
	public command: Command;
	public aboutEventSensor: FullAboutEquipment;
	public aboutResultDevice: FullAboutEquipment;
	public eventForm = new FormGroup({
		sensorValue: new FormControl('', [
			Validators.required.bind(Validators),
			Validators.pattern(/^\d+$/),
		]),
		comparator: new FormControl('', Validators.required.bind(Validators)),
		name: new FormControl('', Validators.required.bind(Validators)),
		chosenSensor: new FormControl('', Validators.required.bind(Validators)),
	});
	public resultForm = new FormGroup({
		deviceValue: new FormControl(false, Validators.required.bind(Validators)),
		chosenDevice: new FormControl('', Validators.required.bind(Validators)),
	});
	@ViewChild('stepper') public readonly stepper: MatHorizontalStepper;

	public destroy$ = new Subject();

	constructor(
		private readonly roomListFacade: RoomListFacade,
		private readonly commandListFacade: CommandListFacade,
		private readonly dialogRef: MatDialogRef<AddCommandComponent>,
		public readonly actions$: Actions,
	) {}

	ngOnInit(): void {
		this.roomsOnlyWithSensors$ = this.roomListFacade.rooms$.pipe(
			map(this.filterByEquipmentGroup('sensor')),
		);
		this.roomsOnlyWithDevices$ = this.roomListFacade.rooms$.pipe(
			map(this.filterByEquipmentGroup('device')),
		);
		this.nameControl?.setAsyncValidators(
			this.notUniqueValidator<Command>(this.commandListFacade.commands$),
		);
	}

	get sensorValueControl(): AbstractControl | null {
		return this.eventForm.get('sensorValue');
	}

	get comparatorControl(): AbstractControl | null {
		return this.eventForm.get('comparator');
	}

	get nameControl(): AbstractControl | null {
		return this.eventForm.get('name');
	}

	get chosenSensorControl(): AbstractControl | null {
		return this.eventForm.get('chosenSensor');
	}

	get deviceValueControl(): AbstractControl | null {
		return this.resultForm.get('deviceValue');
	}

	get chosenDeviceControl(): AbstractControl | null {
		return this.resultForm.get('chosenDevice');
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
		if (stage === 'event') {
			this.aboutEventSensor = { room, hardware, equipment };
			this.chosenSensorControl?.setValue(equipment.id);
		}
		if (stage === 'result') {
			this.aboutResultDevice = { room, hardware, equipment };
			this.chosenDeviceControl?.setValue(equipment.id);
		}
	}

	notUniqueValidator<T extends BaseDomain>(entities$: Observable<T[]>): AsyncValidatorFn {
		return function (control: AbstractControl): Observable<null | ValidationErrors> {
			return entities$.pipe(
				debounceTime(300),
				take(1),
				map((entities) =>
					!!entities.find((ent) => ent.name === control.value) ? notUnique : null,
				),
				catchError(() => of(notUnique)),
			);
		};
	}

	addCommand(): void {
		this.chosenDeviceControl?.markAsDirty();
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
			const name = this.nameControl?.value;
			this.commandListFacade.addCommand(new Command({ name, body, id: null }));
			this.checkAndClose(name);
		}
	}

	checkAndClose(name: Command['name']): void {
		this.actions$
			.pipe(
				ofType<CommandListStoreActions.AddCommandSuccess>(
					CommandListStoreActions.CommandListActionTypes.AddCommandSuccess,
				),
				take(1),
				takeUntil(this.destroy$),
			)
			.subscribe((action) => {
				if (action.payload.command.name === name) {
					this.dialogRef.close();
				}
			});
	}

	filterByEquipmentGroup(group: Equipment['group']) {
		return (rooms: Room[]) => {
			const newRooms: Room[] = [];
			rooms.forEach((room) => {
				const newRoom = new Room({ ...room, hardwares: [] });
				room.hardwares.forEach((hardware) => {
					const equipmentsFiltered = hardware.equipments
						.filter((eqp) => eqp.group === group)
						.map((eqp) => new Equipment({ ...eqp }));
					if (equipmentsFiltered.length) {
						const newHardware = new Hardware({
							...hardware,
							equipments: equipmentsFiltered,
						});
						newRoom.hardwares.push(newHardware);
					}
				});
				if (newRoom.hardwares.length) {
					newRooms.push(newRoom);
				}
			});
			return newRooms;
		};
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
