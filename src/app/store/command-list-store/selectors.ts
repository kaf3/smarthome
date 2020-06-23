import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromCommands from './reducer';
import { CommandListState } from './reducer';
import { CommandList } from '@models/command';

export const selectCommandListState = createFeatureSelector<fromCommands.CommandListState>(
	fromCommands.commandListFeatureKey,
);

export const selectCallState = createSelector(selectCommandListState, (state) => state.callState);

export const selectCommandList: MemoizedSelector<CommandListState, CommandList> = createSelector(
	selectCommandListState,
	(state) => state.commandList,
);

export const selectCommandEntityState = createSelector(
	selectCommandList,
	(cmdList) => cmdList.commandEntityState,
);

export const {
	selectEntities,
	selectAll,
	selectIds,
	selectTotal,
} = CommandList.adapter.getSelectors(selectCommandEntityState);
