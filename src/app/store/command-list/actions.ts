import { Action } from '@ngrx/store';
import { Command, CommandList } from '@models/command';

export enum CommandListActionTypes {
	LoadCommandList = '[Commands] Load Command List',
	LoadCommandListSuccess = '[Commands] Load Command List Success',
	LoadCommandListFailure = '[Commands] Load Command List Failure',
	AddCommand = '[Commands] Add Command',
	AddCommandSuccess = '[Commands] Add Command Success',
	AddCommandFailure = '[Commands] Add Command Failure',
	DeleteCommand = '[Commands] Delete Command',
	DeleteCommandSuccess = '[Commands] Delete Command Success',
	DeleteCommandFailure = '[Commands] Delete Command Failure',
	UpdateCommand = '[Commands] Update Command',
	UpdateCommandSuccess = '[Commands] Update Command Success',
	UpdateCommandFailure = '[Commands] Update Command Failure',
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

export class AddCommand implements Action {
	readonly type = CommandListActionTypes.AddCommand;

	constructor(public payload: { command: Command }) {}
}

export class AddCommandSuccess implements Action {
	readonly type = CommandListActionTypes.AddCommandSuccess;

	constructor(public payload: { command: Command }) {}
}

export class AddCommandFailure implements Action {
	readonly type = CommandListActionTypes.AddCommandFailure;

	constructor(public payload: { errorMsg: string }) {}
}

export class DeleteCommand implements Action {
	readonly type = CommandListActionTypes.DeleteCommand;

	constructor(public payload: { command: Command }) {}
}

export class DeleteCommandSuccess implements Action {
	readonly type = CommandListActionTypes.DeleteCommandSuccess;

	constructor(public payload: { command: Command }) {}
}

export class DeleteCommandFailure implements Action {
	readonly type = CommandListActionTypes.DeleteCommandFailure;

	constructor(public payload: { errorMsg: string }) {}
}

export class UpdateCommand implements Action {
	readonly type = CommandListActionTypes.UpdateCommand;

	constructor(public payload: { command: Command }) {}
}

export class UpdateCommandSuccess implements Action {
	readonly type = CommandListActionTypes.UpdateCommandSuccess;

	constructor(public payload: { command: Command }) {}
}

export class UpdateCommandFailure implements Action {
	readonly type = CommandListActionTypes.UpdateCommandFailure;

	constructor(public payload: { errorMsg: string }) {}
}

export type CommandListActions =
	| LoadCommandList
	| LoadCommandListSuccess
	| LoadCommandListFailure
	| AddCommand
	| AddCommandSuccess
	| AddCommandFailure
	| DeleteCommand
	| DeleteCommandSuccess
	| DeleteCommandFailure
	| UpdateCommand
	| UpdateCommandSuccess
	| UpdateCommandFailure;
