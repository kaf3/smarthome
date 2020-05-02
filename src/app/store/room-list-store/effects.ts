import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
    LoadRooms,
    LoadRoomsError,
    LoadRoomsSuccess,
    RoomsActions,
    UpsertAllRooms,
    UpsertAllRoomsSuccess,
} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';

import {of} from 'rxjs';
import {HttpRoomsService} from '@services';
import {Equipment, Room, RoomsDTO} from '@models';
import {SerializeService} from '@services';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class RoomsEffects {
    loadRooms$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadRooms>(RoomsActions.loadRooms),
            switchMap(() => this.httpRoomsService.loadRooms()),
            switchMap((rooms: Room[]) => of(new LoadRoomsSuccess({rooms}))),
            catchError(() =>
                of(new LoadRoomsError({errorMsg: 'Error: could not load rooms'})),
            ),
        ),
    );

    upsertAllRooms$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UpsertAllRooms>(RoomsActions.upsertAllRooms),
            switchMap(({payload}) => {
                const {obj} = payload;

                if (obj.hasOwnProperty('roomName')) {
                    return of(null);
                }

                if (obj.hasOwnProperty('value')) {
                    return this.httpRooms.loadRoomsDTO().pipe(
                        map(roomsDTO => {
                            const equipmentDTO = this.serializer.serializeEquipment(
                                obj as Equipment,
                            );

                            roomsDTO[equipmentDTO.r_name] = this.serializer.serializeRoom(
                                equipmentDTO,
                                roomsDTO[equipmentDTO.r_name],
                            );

                            return roomsDTO;
                        }),
                    );
                }

                return of(null);
            }),
            switchMap((roomsDTO: RoomsDTO) => this.httpRooms.postRooms(roomsDTO)),
            switchMap((rooms: Room[]) => of(new UpsertAllRoomsSuccess({rooms}))),
            catchError(() =>
                of(new LoadRoomsError({errorMsg: 'Error: could not update rooms'})),
            ),
        ),
    );

    errorHandler = createEffect(
        () =>
            this.actions$.pipe(
                ofType<LoadRoomsError>(RoomsActions.loadRoomsError),
                map((action: LoadRoomsError) =>
                    this.openSnackBar(action.payload.errorMsg, 'Error'),
                ),
            ),
        {dispatch: false},
    );

    private openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }

    constructor(
        private readonly actions$: Actions,
        private readonly httpRoomsService: HttpRoomsService,
        private readonly httpRooms: HttpRoomsService,
        private readonly serializer: SerializeService,
        private readonly _snackBar: MatSnackBar,
    ) {}
}
