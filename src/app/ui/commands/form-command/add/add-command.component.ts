import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RoomListFacade } from '@store/room-list';
import { Command } from '@models/command';
import { CommandListFacade } from '@store/command-list';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Actions } from '@ngrx/effects';
import { FormCommandComponent } from '../form-command.component';

@Component({
	selector: 'app-add-command',
	templateUrl: '../addOrUpdate-command.component.html',
	styleUrls: ['../addOrUpdate-command.component.scss'],
})
export class AddCommandComponent extends FormCommandComponent implements OnInit, OnDestroy {
	constructor(
		roomListFacade: RoomListFacade,
		commandListFacade: CommandListFacade,
		dialogRef: MatDialogRef<AddCommandComponent>,
		actions$: Actions,
		@Inject(MAT_DIALOG_DATA) data: Command,
	) {
		super(roomListFacade, commandListFacade, dialogRef, actions$, data);
	}

	ngOnInit(): void {
		this.superOnInit();
		this.nameControl?.setAsyncValidators(
			this.notUniqueValidator<Command>(this.commandListFacade.commands$),
		);
	}

	submitForm(): Command | null {
		const command = super.submitForm();
		if (command) {
			this.commandListFacade.addCommand(command);
			this.checkAndClose(command.name);
		}
		return command;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
