import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMapTo, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
	CommandListActions,
	CommandListActionTypes,
	LoadCommandListFailure,
	LoadCommandListSuccess,
} from './actions';
import { HttpCommandsService } from '@services';

@Injectable()
export class CommandsEffects {
	loadComandList$ = createEffect(() =>
		this.actions$.pipe(
			ofType<CommandListActions>(CommandListActionTypes.LoadCommandList),
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

	constructor(
		private actions$: Actions<CommandListActions>,
		private httpCommandsService: HttpCommandsService,
	) {}
}
