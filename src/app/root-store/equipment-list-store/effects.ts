import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EquipmentListState} from './state';
import {Store} from '@ngrx/store';
import {EquipmentListActions, LoadEquipmentList, LoadEquipmentListError, LoadEquipmentListSuccess} from './actions';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {selectRoom} from '../room-store/selectors';
import {IRoom} from '../../../models/iroom';
import {IEquipment} from '../../../models/iequipment';
import {of} from 'rxjs';

@Injectable()
export class EquipmentListEffects {
  loadEquipmentList$ = createEffect(() => this.actions$.pipe(
    ofType<LoadEquipmentList>(EquipmentListActions.loadEquipmentList),
    switchMap(() => this.store.select(selectRoom).pipe(
      filter(room => !!room),
      map((room: IRoom) => room.equipment))
    ),
    switchMap((equipmentList: IEquipment[]) => of(new LoadEquipmentListSuccess({equipmentList}))),
    catchError(() => of(new LoadEquipmentListError()))
  ));
  constructor(private actions$: Actions, private store: Store<EquipmentListState>) {}
}
