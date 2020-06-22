import { Injectable } from '@angular/core';
import { LoadableFacade } from '@models/common';
import { CommandListState } from './reducer';
import { Store } from '@ngrx/store';
import { selectAll, selectCallState, selectCommandList } from './selectors';
import { Observable } from 'rxjs';
import { Command, CommandList } from '@models/command';
import { LoadCommandList } from './actions';

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
}
