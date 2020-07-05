import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { Equipment, EquipmentComponentInputs, EquipmentComponentSize } from '@models/equipment';
import { Hardware } from '@models/hardware';
import { Room } from '@models/room';
import { UnitPipe } from '@pipes';

@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
	public unit = new UnitPipe();

	@Input() size: EquipmentComponentSize;
	@Input() room?: Room;
	@Input() hardware?: Hardware;
	@Input() equipment?: Equipment;
	@Output() opened = new EventEmitter<Equipment>();

	detailList: { key: string; value: string }[];

	constructor(@Optional() public readonly inputs: EquipmentComponentInputs) {}

	ngOnInit(): void {
		if (!this.equipment) this.equipment = this.inputs?.equipment;
		if (!this.hardware) this.hardware = this.inputs?.hardware;
		if (!this.room) this.room = this.inputs?.room;
		if (!this.size) this.size = this.inputs?.size;

		this.detailList = [
			{
				key: 'значение',
				value: this.unit.transform(this.equipment.value, this.equipment),
			},
			{
				key: 'тип устройства',
				value: this.equipment.type ?? '',
			},
			{
				key: 'статус',
				value: this.equipment.status ? 'работает' : 'не работает',
			},
			{
				key: 'местонахождение',
				value: this.room?.name ?? '' + ' / ' + (this.hardware?.name ?? ''),
			},
		].filter((det) => !!det.value && det.value !== ' / ');
	}

	onOpen(equipment: Equipment): void {
		this.opened.emit(equipment);
	}
}
