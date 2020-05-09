import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {EquipmentStoreSelectors, EquipmentStoreState} from '@store';
import {Equipment} from '@models';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
    equipment$: Observable<Equipment>;

    constructor(
        public store: Store<EquipmentStoreState.EquipmentState>,
        public route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.equipment$ = this.store.pipe(
            select(EquipmentStoreSelectors.selectEquipment),
            filter(equipment => !!equipment),
        );
    }
}
