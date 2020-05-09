import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {EquipmentStoreSelectors} from '@store';
import {select, Store} from '@ngrx/store';
import {EquipmentStoreState} from '@store';
import {filter, first, map, take} from 'rxjs/operators';
import {Equipment} from '@models';

@Injectable()
export class EquipmentResolver implements Resolve<Equipment | any> {
    constructor(private readonly store: Store<EquipmentStoreState.EquipmentState>) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<Equipment> | any {
        console.log('resolver');
        return this.store.pipe(
            select(EquipmentStoreSelectors.selectEquipment),

            filter(eqp => !!eqp.id),

            map(x => {
                console.log(x);
                return x;
            }),
            take(1),
        );
    }
}
