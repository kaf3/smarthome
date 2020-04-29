import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
    EquipmentListStoreActions,
    EquipmentListStoreSelectors,
    EquipmentListStoreState,
} from '@store';
import {filter} from 'rxjs/operators';
import {Equipment} from '@models';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-equipment-list',
    templateUrl: './equipment-list.component.html',
    styleUrls: ['./equipment-list.component.scss'],
})
export class EquipmentListComponent implements OnInit {
    equipmentList$: Observable<Equipment[]>;
    constructor(public store: Store<EquipmentListStoreState.EquipmentListState>) {
        this.store.dispatch(new EquipmentListStoreActions.LoadEquipmentList());
        this.equipmentList$ = this.store.pipe(
            select(EquipmentListStoreSelectors.selectEquipmentList),
            filter((equipmentList: Equipment[]) => !!equipmentList.length),
        );
    }

    ngOnInit(): void {}
}
