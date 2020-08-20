import { Injectable } from '@angular/core';
import { LoadableFacade } from '@models/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Command, CommandList } from '@models/command';
import { selectAll, selectCallState, selectCommandList } from './selectors';
import { CommandListState } from './reducer';
import { AddCommand, DeleteCommand, LoadCommandList, UpdateCommand } from './actions';

@Injectable()
export class CommandListFacade extends LoadableFacade<CommandListState> {
	public readonly commandList$: Observable<CommandList>;

	public readonly commands$: Observable<Command[]>;

	constructor(store: Store<CommandListState>) {
		super(store, selectCallState);

		this.commandList$ = this.store.select(selectCommandList);
		this.commands$ = this.store.select(selectAll);
	}

	public loadCommandList(): void {
		this.store.dispatch(new LoadCommandList());
	}

	public addCommand(command: Command): void {
		this.store.dispatch(new AddCommand({ command }));
	}

	public deleteCommand(command: Command): void {
		this.store.dispatch(new DeleteCommand({ command }));
	}

	public updateCommand(command: Command): void {
		this.store.dispatch(new UpdateCommand({ command }));
	}
}
