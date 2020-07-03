import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Equipment } from '@models/equipment';
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

	@Input() size: 'expand' | 'small' | 'large';
	@Input() room?: Room;
	@Input() hardware?: Hardware;
	@Input() equipment: Equipment;
	@Output() opened = new EventEmitter<Equipment>();

	detailList: { key: string; value: string }[];

	ngOnInit(): void {
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
