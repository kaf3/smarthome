import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Room } from '@models/room';
import { RoomListFacade } from '@store/room-list';
import { Hardware } from '@models/hardware';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
	public room$: Observable<Room | undefined>;

	public openedId: string | null = null;

	constructor(private readonly roomListFacade: RoomListFacade) {}

	ngOnInit(): void {
		this.room$ = this.roomListFacade.room$.pipe(filter((room) => !!room?.id));
	}

	delete(room: Room): void {
		this.roomListFacade.deleteRoom(room);
	}

	getHardwares(room: Room): (Hardware | undefined)[] {
		return Room.getHardwares(room);
	}
}
