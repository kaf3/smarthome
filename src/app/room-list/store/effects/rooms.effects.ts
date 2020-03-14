import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects"
import { loadRooms, roomsActions, loadRoomsSucces} from '../actions/rooms.action';
import { switchMap} from 'rxjs/operators'

import { of } from 'rxjs';
import { LoadRoomService } from '../../../sevices/load-room.service';
import { navigation } from '@nrwl/angular';
import { AppComponent } from 'src/app/app.component';


@Injectable()
export class RoomsEffects {
    @Effect()
    loadRooms$ = this.actions$.pipe(
        ofType<loadRooms>(roomsActions.loadRooms),
/*         mergeMap(() => this.loadRoomService.loadRoom().pipe(
            map((rooms: IRoom[]) => of(new loadRoomsSucces({rooms: rooms}))),
            catchError(() => of(new loadRoomsError()))
        )), */
        switchMap(() => this.loadRoomService.loadRoom()),
        switchMap((rooms) => of(new loadRoomsSucces({rooms: rooms})))
    )

    test = createEffect(() => this.actions$.pipe(
        navigation(
            AppComponent, {
                run: (x) => {
                    console.log("wow");
                    return of({type: "test"})
                }
            }
        )
    ))

    constructor(private actions$: Actions,
                private loadRoomService: LoadRoomService) {}
}