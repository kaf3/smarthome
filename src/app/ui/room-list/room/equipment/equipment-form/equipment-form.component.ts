import { Component } from '@angular/core';
import { EquipmentFormFacade, EquipmentFormStoreState } from '@store/equipment-form';
import { Observable } from 'rxjs';
import { Equipment, EquipmentGroup } from '@models/equipment';
import { filter } from 'rxjs/operators';
import { EquipmentFacade } from '@store/equipment';

@Component({
	selector: 'app-equipment-form',
	templateUrl: './equipment-form.component.html',
	styleUrls: ['./equipment-form.component.scss'],
})
export class EquipmentFormComponent {
	public readonly formState$: Observable<EquipmentFormStoreState.EquipmentFormState>;
	public readonly equipment$: Observable<Equipment>;
	public readonly DEVICE = EquipmentGroup.DEVICE;

	constructor(
		public readonly equipmentFacade: EquipmentFacade,
		public readonly equipmentFormFacade: EquipmentFormFacade,
	) {
		this.formState$ = this.equipmentFormFacade.equipmentFormState$;
		this.equipment$ = this.equipmentFacade.equipment$.pipe(filter((eqp) => !!eqp.id));

		this.equipmentFormFacade.loadEquipmentForm();
	}

	public submitForm(): void {
		this.equipmentFormFacade.submitEquipmentForm();
	}
}
