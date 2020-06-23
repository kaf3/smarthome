import { CommandListActions, CommandListActionTypes } from './actions';
import { CommandList } from '@models/command';
import { CallState, LoadingState } from '@models/error-loading';

export const commandListFeatureKey = 'commands';

export interface CommandListState {
	commandList: CommandList;
	callState: CallState;
}

export const initialState: CommandListState = {
	commandList: CommandList.initial,
	callState: LoadingState.INIT,
};

export function reducer(state = initialState, action: CommandListActions): CommandListState {
	switch (action.type) {
		case CommandListActionTypes.LoadCommandList:
		case CommandListActionTypes.AddCommand:
		case CommandListActionTypes.DeleteCommand:
		case CommandListActionTypes.UpdateCommand:
			return { ...state, callState: LoadingState.LOADING };

		case CommandListActionTypes.LoadCommandListSuccess:
			return {
				...state,
				commandList: action.payload.commandList,
				callState: LoadingState.LOADED,
			};

		case CommandListActionTypes.AddCommandSuccess:
			return {
				...state,
				commandList: CommandList.addCommand(state.commandList, action.payload.command),
				callState: LoadingState.LOADED,
			};

		case CommandListActionTypes.UpdateCommandSuccess:
			return {
				...state,
				commandList: CommandList.updateCommand(state.commandList, action.payload.command),
				callState: LoadingState.LOADED,
			};

		case CommandListActionTypes.DeleteCommandSuccess:
			return {
				...state,
				commandList: CommandList.deleteCommand(state.commandList, action.payload.command),
				callState: LoadingState.LOADED,
			};

		case CommandListActionTypes.LoadCommandListFailure:
		case CommandListActionTypes.AddCommandFailure:
		case CommandListActionTypes.DeleteCommandFailure:
		case CommandListActionTypes.UpdateCommandFailure:
			return { ...state, callState: action.payload };

		default:
			return state;
	}
}
