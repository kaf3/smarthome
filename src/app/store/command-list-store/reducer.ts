import { CommandListActions, CommandListActionTypes } from './actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Command } from '@models/command';
import { CallState, LoadingState } from '@models/error-loading';

export const commandListFeatureKey = 'commands';

export interface CommandListState extends EntityState<Command> {
	callState: CallState;
}

export const commandListAdapter: EntityAdapter<Command> = createEntityAdapter<Command>({
	selectId: (command: Command) => command.id ?? '',
	sortComparer: false,
});

export const initialState: CommandListState = commandListAdapter.getInitialState({
	callState: LoadingState.INIT,
});

export function reducer(state = initialState, action: CommandListActions): CommandListState {
	switch (action.type) {
		case CommandListActionTypes.LoadCommandList:
			return { ...state, callState: LoadingState.LOADING };

		case CommandListActionTypes.LoadCommandListSuccess:
			return { ...action.payload.commandList, callState: LoadingState.LOADED };

		case CommandListActionTypes.LoadCommandListFailure:
			return { ...state, callState: action.payload };

		default:
			return state;
	}
}
