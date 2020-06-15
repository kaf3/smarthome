import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

interface ErrorAction extends Action {
	payload: { errorMsg: string };
}

export class ErrorEffects {
	constructor(private readonly _snackBar: MatSnackBar, public readonly actions$: Actions) {}

	private openSnackBar(message: string, action: string): void {
		this._snackBar.open(message, action, {
			duration: 2000,
		});
	}

	public createErrorHandler(...actionTypes: string[]): Observable<void> & CreateEffectMetadata {
		return createEffect(
			() =>
				this.actions$.pipe(
					ofType(...actionTypes),
					map((action: ErrorAction) =>
						this.openSnackBar(action.payload.errorMsg, 'Error'),
					),
				),
			{ dispatch: false },
		);
	}
}
