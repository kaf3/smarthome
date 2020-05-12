import { Component, OnInit } from '@angular/core';
import { EquipmentFacade } from '@store/equipment';
import { Equipment } from '@models';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
	equipment$: Observable<Equipment>;

	constructor(public readonly equipmentFacade: EquipmentFacade) {}

	ngOnInit(): void {
		this.equipment$ = this.equipmentFacade.equipment$.pipe(filter((equipment) => !!equipment));
	}
}
