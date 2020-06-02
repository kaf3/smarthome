import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HardwareFormFacade, HardwareFormStoreState } from '@store/hardware-form';
import { RoomListFacade } from '@store/room-list';
import { Room } from '@models/room';
import { filter, take } from 'rxjs/operators';

@Component({
	selector: 'app-hardware-form',
	templateUrl: './hardware-form.component.html',
	styleUrls: ['./hardware-form.component.scss'],
})
export class HardwareFormComponent {
	public readonly formState$: Observable<HardwareFormStoreState.HardwareFormState>;
	public readonly rooms$: Observable<Room[]>;

	constructor(
		public readonly hardwareFormFacade: HardwareFormFacade,
		public readonly roomListFacade: RoomListFacade,
	) {
		this.formState$ = this.hardwareFormFacade.hardwareFormState$;
		this.rooms$ = this.roomListFacade.rooms$;

		this.hardwareFormFacade.loadHardwareForm();
	}

	public submitForm(): void {
		this.formState$
			.pipe(
				filter((fs) => fs.isValid && fs.isDirty),
				take(1),
			)
			.subscribe(() => this.hardwareFormFacade.submitHardwareForm());
	}

	public reset(): void {
		this.hardwareFormFacade.loadHardwareForm();
	}
}
