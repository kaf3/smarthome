import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {EquipmentStoreSelectors, EquipmentStoreState} from '@store';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {Equipment} from '@models';

@Injectable()
export class EquipmentResolver implements Resolve<Equipment | any> {
    constructor(private readonly store: Store<EquipmentStoreState.EquipmentState>) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<Equipment> | any {
        return this.store.pipe(
            select(EquipmentStoreSelectors.selectLoaded),
            take(1),
        );
    }
}
