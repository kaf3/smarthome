import { Action } from '@ngrx/store';
import { CommandList } from '@models/command';

export enum CommandListActionTypes {
	LoadCommandList = '[Commands] Load Command List',
	LoadCommandListSuccess = '[Commands] Load Command List Success',
	LoadCommandListFailure = '[Commands] Load Command List Failure',
}

export class LoadCommandList implements Action {
	readonly type = CommandListActionTypes.LoadCommandList;
}

export class LoadCommandListSuccess implements Action {
	readonly type = CommandListActionTypes.LoadCommandListSuccess;
	constructor(public payload: { commandList: CommandList }) {}
}

export class LoadCommandListFailure implements Action {
	readonly type = CommandListActionTypes.LoadCommandListFailure;
	constructor(public payload: { errorMsg: string }) {}
}

export type CommandListActions = LoadCommandList | LoadCommandListSuccess | LoadCommandListFailure;
