import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EquipmentState} from './state';
import {Store} from '@ngrx/store';
import {
    EquipmentActions,
    GetEquipment,
    GetEquipmentError,
    GetEquipmentSuccess,
} from './actions';
import {navigation} from '@nrwl/angular';
import {EquipmentComponent} from '../../room-list/room/equipment-list/equipment/equipment.component';
import {ActivatedRouteSnapshot} from '@angular/router';
import {of} from 'rxjs';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {EquipmentListStoreSelectors} from '../equipment-list-store';
import {IEquipment} from '../../../models/iequipment';

@Injectable()
export class EquipmentEffects {
    getEquipment$ = createEffect(() =>
        this.actions$.pipe(
            ofType<GetEquipment>(EquipmentActions.getEquipment),
            map(action => action.payload.id),
            switchMap(id =>
                this.store
                    .select(EquipmentListStoreSelectors.selectEquipmentList)
                    .pipe(
                        map((equipmentList: IEquipment[]) =>
                            equipmentList.find(equipment => equipment.id === id),
                        ),
                    ),
            ),
            filter(equipment => !!equipment),
            switchMap(equipment => of(new GetEquipmentSuccess({equipment}))),
            catchError(() => of(new GetEquipmentError())),
        ),
    );

    navigationEquipment = createEffect(() =>
        this.actions$.pipe(
            navigation(EquipmentComponent, {
                run: (routerSnap: ActivatedRouteSnapshot) => {
                    return of(new GetEquipment({id: routerSnap.params.detail}));
                },
            }),
        ),
    );

    constructor(private actions$: Actions, private store: Store<EquipmentState>) {}
}
