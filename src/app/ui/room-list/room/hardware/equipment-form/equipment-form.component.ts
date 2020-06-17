import { Component, Input } from '@angular/core';
import { EquipmentFormFacade } from '@store/equipment-form';
import { BehaviorSubject, Observable } from 'rxjs';
import { Equipment } from '@models/equipment';
import { distinctUntilKeyChanged, filter, take } from 'rxjs/operators';
import { EquipmentFormState } from '../../../../../store/equipment-form-store/reducer';

@Component({
	selector: 'app-equipment-form',
	templateUrl: './equipment-form.component.html',
	styleUrls: ['./equipment-form.component.scss'],
})
export class EquipmentFormComponent {
	private eqpSubject = new BehaviorSubject<Equipment | null>(null);
	@Input() set equipment(eqp: Equipment) {
		if (!!eqp && eqp?.id !== this.eqpSubject.getValue()?.id) {
			this.eqpSubject.next(eqp);
		}
	}
	get equipment$(): Observable<Equipment> {
		return this.eqpSubject.asObservable().pipe(distinctUntilKeyChanged<Equipment>('id'));
	}

	public readonly formState$: Observable<EquipmentFormState>;

	constructor(public readonly equipmentFormFacade: EquipmentFormFacade) {
		this.formState$ = this.equipmentFormFacade.equipmentFormState$;
	}

	public submitForm(): void {
		this.equipment$
			.pipe(
				filter((eqp) => !!eqp?.id),
				take(1),
			)
			.subscribe((eqp) => this.equipmentFormFacade.submitEquipmentForm(eqp));
	}
}
