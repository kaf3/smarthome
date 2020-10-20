import { Component, Inject } from '@angular/core';
import { CURTAIN_DATA, CurtainRef } from '../curtain/curtain.component';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
	constructor(@Inject(CURTAIN_DATA) public data: any, public readonly curtainRef: CurtainRef) {}
}
