import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
    EquipmentListStoreAction,
    EquipmentListStoreSelectors,
    EquipmentListStoreState,
} from 'src/app/root-store';
import {filter} from 'rxjs/operators';
import {Equipment} from '../../../../models/equipment';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-equipment-list',
    templateUrl: './equipment-list.component.html',
    styleUrls: ['./equipment-list.component.css'],
})
export class EquipmentListComponent implements OnInit {
    equipmentList$: Observable<Equipment[]>;
    constructor(public store: Store<EquipmentListStoreState.EquipmentListState>) {}

    ngOnInit(): void {
        this.store.dispatch(new EquipmentListStoreAction.LoadEquipmentList());
        this.equipmentList$ = this.store.pipe(
            select(EquipmentListStoreSelectors.selectEquipmentList),
            filter((equipmentList: Equipment[]) => !!equipmentList.length),
        );
    }
}
