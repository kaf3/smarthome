import { Component, OnInit } from '@angular/core';
import { HardwareFacade } from '@store/hardware';
import { Observable } from 'rxjs';
import { Hardware } from '@models/hardware';

@Component({
	selector: 'app-hardware',
	templateUrl: './hardware.component.html',
	styleUrls: ['./hardware.component.scss'],
})
export class HardwareComponent implements OnInit {
	public hardware$: Observable<Hardware>;

	constructor(public readonly hardwareFacade: HardwareFacade) {}

	ngOnInit(): void {
		this.hardware$ = this.hardwareFacade.hardware$;
	}
}
