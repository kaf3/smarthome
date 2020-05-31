import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EquipmentGroup } from '@models/equipment';
import { RoomFacade } from '@store/room';
import { Room } from '@models/room';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
	public room$: Observable<Room>;
	public readonly DEVICE = EquipmentGroup.DEVICE;

	constructor(private readonly roomFacade: RoomFacade) {}

	ngOnInit(): void {
		this.room$ = this.roomFacade.room$.pipe(filter((room) => !!room?.id));
	}
}
