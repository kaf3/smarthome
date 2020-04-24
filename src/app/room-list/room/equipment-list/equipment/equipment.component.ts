import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {EquipmentStoreSelectors, EquipmentStoreState} from 'src/app/root-store';
import {IEquipment} from '../../../../../models/iequipment';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  equipment: IEquipment;

  constructor(public store: Store<EquipmentStoreState.EquipmentState>) { }

  ngOnInit(): void {
    this.store.pipe(select(EquipmentStoreSelectors.selectEquipment))
      .subscribe((equipment: IEquipment) => this.equipment = equipment);
  }

}
