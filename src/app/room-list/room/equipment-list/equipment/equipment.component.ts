import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {EquipmentStoreSelectors, EquipmentStoreState} from 'src/app/root-store';
import {Equipment} from '../../../../../models/equipment';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.css'],
})
export class EquipmentComponent implements OnInit {
    equipment: Equipment;

    constructor(public store: Store<EquipmentStoreState.EquipmentState>) {}

    ngOnInit(): void {
        this.store
            .pipe(select(EquipmentStoreSelectors.selectEquipment))
            .subscribe((equipment: Equipment) => (this.equipment = equipment));
    }
}
