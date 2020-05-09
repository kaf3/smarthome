import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {navigation} from '@nrwl/angular';
import {EquipmentComponent} from './equipment.component';
import {ActivatedRouteSnapshot} from '@angular/router';
import {of} from 'rxjs';
import {EquipmentStoreActions} from '@store';

@Injectable()
export class EquipmentUiEffects {
    navigationEquipment = createEffect(() =>
        this.actions$.pipe(
            navigation(EquipmentComponent, {
                run: (routerSnap: ActivatedRouteSnapshot) => {
                    return of(
                        new EquipmentStoreActions.GetEquipment({
                            id: routerSnap.params.detail,
                        }),
                    );
                },
                onError: (a: ActivatedRouteSnapshot, e: any): any => {
                    return of(new EquipmentStoreActions.GetEquipmentError());
                },
            }),
        ),
    );

    constructor(private readonly actions$: Actions) {}
}