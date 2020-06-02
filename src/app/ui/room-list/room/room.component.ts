import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from '@angular/core';
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

	constructor(
		private readonly roomFacade: RoomFacade,
		private readonly vcr: ViewContainerRef,
		private cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.room$ = this.roomFacade.room$.pipe(filter((room) => !!room?.id));
	}
}
