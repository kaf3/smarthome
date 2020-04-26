import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {EquipmentStoreSelectors, EquipmentStoreState} from 'src/app/root-store';
import {Equipment} from '../../../../../models/equipment';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
    equipment$: Observable<Equipment>;

    constructor(public store: Store<EquipmentStoreState.EquipmentState>) {}

    ngOnInit(): void {
        this.equipment$ = this.store.pipe(
            select(EquipmentStoreSelectors.selectEquipment),
            filter(equipment => !!equipment),
        );
    }
}
