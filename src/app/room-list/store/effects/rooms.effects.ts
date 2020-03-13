import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects"
import { loadRooms, roomsActions, loadRoomsSucces} from '../actions/rooms.action';
import { switchMap} from 'rxjs/operators'

import { of } from 'rxjs';
import { LoadRoomService } from '../../../sevices/load-room.service';


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

    constructor(private actions$: Actions,
                private loadRoomService: LoadRoomService) {}
}