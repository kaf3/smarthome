import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
    EquipmentListStoreAction,
    EquipmentListStoreSelectors,
    EquipmentListStoreState,
} from 'src/app/root-store';
import {filter} from 'rxjs/operators';
import {IEquipment} from '../../../../models/iequipment';

@Component({
    selector: 'app-equipment-list',
    templateUrl: './equipment-list.component.html',
    styleUrls: ['./equipment-list.component.css'],
})
export class EquipmentListComponent implements OnInit {
    equipmentList: IEquipment[] = [];

    constructor(public store: Store<EquipmentListStoreState.EquipmentListState>) {}

    ngOnInit(): void {
        this.store.dispatch(new EquipmentListStoreAction.LoadEquipmentList());
        this.store
            .pipe(
                select(EquipmentListStoreSelectors.selectEquipmentList),
                filter((equipmentList: IEquipment[]) => !!equipmentList.length),
            )
            .subscribe(
                (equipmentList: IEquipment[]) => (this.equipmentList = equipmentList),
            );
    }
}
