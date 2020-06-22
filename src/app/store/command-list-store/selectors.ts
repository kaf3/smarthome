import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromCommands from './reducer';
import { commandListAdapter, CommandListState } from './reducer';
import { CommandList } from '@models/command';

export const selectCommandListState = createFeatureSelector<fromCommands.CommandListState>(
	fromCommands.commandListFeatureKey,
);

export const {
	selectEntities,
	selectAll,
	selectIds,
	selectTotal,
} = commandListAdapter.getSelectors(selectCommandListState);

export const selectCallState = createSelector(selectCommandListState, (state) => state.callState);

export const selectCommandList: MemoizedSelector<CommandListState, CommandList> = createSelector(
	selectCommandListState,
	(state) => ({
		ids: state.ids as string[],
		entities: state.entities,
	}),
);
