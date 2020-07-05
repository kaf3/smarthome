import { Component, OnInit } from '@angular/core';
import { CommandListFacade } from '@store/command-list';
import { Observable } from 'rxjs';
import { Command } from '@models/command';
import { MatDialog } from '@angular/material/dialog';
import { AddCommandComponent } from './add-command/add-command.component';

@Component({
	selector: 'app-commands',
	templateUrl: './commands.component.html',
	styleUrls: ['./commands.component.scss'],
})
export class CommandsComponent implements OnInit {
	public commands$: Observable<Command[]>;

	constructor(
		private readonly commandListFacade: CommandListFacade,
		private readonly matDialog: MatDialog,
	) {}

	ngOnInit(): void {
		this.commands$ = this.commandListFacade.commands$;
	}

	addCommand(): void {
		this.matDialog.open(AddCommandComponent);
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
