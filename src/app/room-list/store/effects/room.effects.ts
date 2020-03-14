import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { roomActions, GetRoomSucces, GetRoom } from '../actions/room.actions';
import { switchMap, map } from 'rxjs/operators';
import { Store} from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { of } from 'rxjs';
import { selectRooms } from '../selectors/rooms.selector';
import { navigation} from '@nrwl/angular'
import { RoomComponent } from '../../room/room.component';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RoomEffects {
    
    getRoom$ = createEffect( () => this.actions$.pipe(
        ofType<GetRoom>(roomActions.getRoom),
        map(action => action.payload.id),
        switchMap((id) => this.store.select(selectRooms).pipe(map(rooms => rooms[id]))),
        switchMap(room => of(new GetRoomSucces({room: room}) ))
    ))

    
    navigation = createEffect( () => this.actions$.pipe(
        navigation(
        RoomComponent, {
            run: (routerSnap : ActivatedRouteSnapshot) => {
                console.log(routerSnap);
                return of(new GetRoom({id: routerSnap.params.id}))
            }
                
        })
    ))


    constructor(private actions$: Actions, private store: Store<AppState>,
        ) {}

}