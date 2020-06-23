import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, concatMapTo, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
	AddCommand,
	AddCommandFailure,
	AddCommandSuccess,
	CommandListActionTypes,
	DeleteCommand,
	DeleteCommandFailure,
	DeleteCommandSuccess,
	LoadCommandList,
	LoadCommandListFailure,
	LoadCommandListSuccess,
	UpdateCommand,
	UpdateCommandFailure,
	UpdateCommandSuccess,
} from './actions';
import { HttpCommandsService } from '@services';

@Injectable()
export class CommandsEffects {
	loadComandList$ = createEffect(() =>
		this.actions$.pipe(
			ofType<LoadCommandList>(CommandListActionTypes.LoadCommandList),
			concatMapTo(
				this.httpCommandsService.loadCommandList().pipe(
					map((commandList) => new LoadCommandListSuccess({ commandList })),
					catchError(() =>
						of(
							new LoadCommandListFailure({
								errorMsg: 'Не удалось загрузить список команд',
							}),
						),
					),
				),
			),
		),
	);

	addCommand$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AddCommand>(CommandListActionTypes.AddCommand),
			concatMap((action) =>
				this.httpCommandsService.postCommand(action.payload.command).pipe(
					map((command) => new AddCommandSuccess({ command })),
					catchError(() =>
						of(new AddCommandFailure({ errorMsg: 'Не удалось добавить команду' })),
					),
				),
			),
		),
	);

	updateCommand$ = createEffect(() =>
		this.actions$.pipe(
			ofType<UpdateCommand>(CommandListActionTypes.UpdateCommand),
			concatMap((action) =>
				this.httpCommandsService.patchCommand(action.payload.command).pipe(
					map((command) => new UpdateCommandSuccess({ command })),
					catchError(() =>
						of(new UpdateCommandFailure({ errorMsg: 'Не удалось изменить команду' })),
					),
				),
			),
		),
	);

	deleteCommand$ = createEffect(() =>
		this.actions$.pipe(
			ofType<DeleteCommand>(CommandListActionTypes.DeleteCommand),
			concatMap((action) =>
				this.httpCommandsService.deleteCommand(action.payload.command).pipe(
					map((value) => {
						if (value.response === null) {
							return new DeleteCommandSuccess({ command: value.command });
						}
						return new DeleteCommandFailure({ errorMsg: 'Не удалось удалить команду' });
					}),
					catchError(() =>
						of(new DeleteCommandFailure({ errorMsg: 'Не удалось удалить команду' })),
					),
				),
			),
		),
	);

	constructor(private actions$: Actions, private httpCommandsService: HttpCommandsService) {}
}
