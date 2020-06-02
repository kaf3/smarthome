import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HardwareFormFacade, HardwareFormStoreState } from '@store/hardware-form';

@Component({
	selector: 'app-hardware-form',
	templateUrl: './hardware-form.component.html',
	styleUrls: ['./hardware-form.component.scss'],
})
export class HardwareFormComponent {
	public readonly formState$: Observable<HardwareFormStoreState.HardwareFormState>;

	constructor(public readonly hardwareFormFacade: HardwareFormFacade) {
		this.formState$ = this.hardwareFormFacade.hardwareFormState$;
	}
}
