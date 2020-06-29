import { Component, OnInit } from '@angular/core';
import { CommandListFacade } from '@store/command-list';
import { Observable } from 'rxjs';
import { Command } from '@models/command';

@Component({
	selector: 'app-commands',
	templateUrl: './commands.component.html',
	styleUrls: ['./commands.component.scss'],
})
export class CommandsComponent implements OnInit {
	public commands$: Observable<Command[]>;

	constructor(private readonly commandListFacade: CommandListFacade) {}

	ngOnInit(): void {
		this.commands$ = this.commandListFacade.commands$;
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
