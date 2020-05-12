import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Equipment, EquipmentGroup } from '@models';
import { RoomFacade } from '@store/room';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
	public roomName$: Observable<string>;
	public equipmentList$: Observable<Equipment[]>;
	public readonly DEVICE = EquipmentGroup.DEVICE;

	constructor(private readonly roomFacade: RoomFacade) {}

	ngOnInit(): void {
		this.roomName$ = this.roomFacade.roomName$.pipe(filter((roomName) => !!roomName));
		this.equipmentList$ = this.roomFacade.equipmentList$;
	}
}
