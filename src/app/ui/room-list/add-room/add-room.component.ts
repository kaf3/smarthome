import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
	AbstractControl,
	AsyncValidatorFn,
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { RoomListFacade, RoomListStoreActions } from '@store/room-list';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, debounceTime, map, take, takeUntil } from 'rxjs/operators';
import { Room } from '@models/room';
import { BaseDomain } from '@models/common';
import { Hardware } from '@models/hardware';
import { Actions, ofType } from '@ngrx/effects';

const notUnique: ValidationErrors = { notUnique: true };

@Component({
	selector: 'app-add-room',
	templateUrl: './add-room.component.html',
	styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent implements OnInit, OnDestroy {
	public destroy$ = new Subject();

	public addForm = new FormGroup({
		nameControl: new FormControl('', Validators.required.bind(Validators)),
	});

	get nameControl(): AbstractControl | null {
		return this.addForm.get('nameControl');
	}

	constructor(
		public readonly roomListFacade: RoomListFacade,
		public readonly actions$: Actions,
		public readonly dialogRef: MatDialogRef<AddRoomComponent>,
	) {}

	ngOnInit(): void {
		this.nameControl?.setAsyncValidators(
			this.notUniqueValidator<Room>(this.roomListFacade.rooms$),
		);
	}

	submitForm(): void {
		if (this.addForm.valid && this.addForm.dirty) {
			const name = this.nameControl?.value;
			const room = new Room({
				id: null,
				name,
				activeHardware: Hardware.initial,
				hardwares: [],
			});
			this.roomListFacade.addRoom(room);
			this.checkAndClose(name);
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

	checkAndClose(name: Room['name']): void {
		this.actions$
			.pipe(
				ofType<RoomListStoreActions.AddRoomSuccess>(
					RoomListStoreActions.RoomListActionsTypes.addRoomSuccess,
				),
				take(1),
				takeUntil(this.destroy$),
			)
			.subscribe((action) => {
				if (action.payload.room.name === name) {
					this.dialogRef.close();
				}
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
