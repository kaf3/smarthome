import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import {
	Activity,
	AdditionalEquipmentVal,
	Equipment,
	EquipmentComponentInputs,
	EquipmentComponentSize,
} from '@models/equipment';
import { Hardware } from '@models/hardware';
import { Room } from '@models/room';
import { UnitPipe } from '@pipes';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
	public unit = new UnitPipe();

	@Input() size?: EquipmentComponentSize;

	@Input() room?: Room;

	@Input() hardware?: Hardware;

	@Input() equipment?: Equipment;

	@Output() opened = new EventEmitter<Equipment>();

	detailList: { key: string; value: string }[];

	deviceForm = this.fb.group({
		value: [null],
	});

	constructor(
		@Optional() public readonly inputs: EquipmentComponentInputs,
		private fb: FormBuilder,
	) {}

	ngOnInit(): void {
		if (!this.equipment) this.equipment = this.inputs?.equipment;
		if (!this.hardware) this.hardware = this.inputs?.hardware;
		if (!this.room) this.room = this.inputs?.room;
		if (!this.size) this.size = this.inputs?.size;

		const editableValues = this.equipment?.additionalValues?.filter((v) => v.editable);
		const nonEditableValues = this.equipment?.additionalValues?.filter((v) => !v.editable);

		const getVal = (v: AdditionalEquipmentVal) => {
			if (typeof v.value === 'boolean' || v.value === 'true' || v.value === 'false') {
				return v.value === true || v.value === 'true' ? Activity.ON : Activity.OFF;
			}
			return v.value + `${v.unit}`;
		};

		const nonEditableDetailList = nonEditableValues?.map((v) => ({
			key: v.type,
			value: getVal(v),
		}));

		editableValues?.forEach((v) => {
			this.deviceForm.addControl(v.type, this.fb.control(v.value));
		});

		this.detailList = [
			...(nonEditableDetailList ?? []),
			{
				key: 'значение',
				value: this.unit.transform(this.equipment?.value, this.equipment),
			},
			{
				key: 'тип устройства',
				value: this.equipment?.type ?? '',
			},
			{
				key: 'статус',
				value: this.equipment?.status ? 'работает' : 'не работает',
			},
			{
				key: 'местонахождение',
				value: this.room?.name ?? `${'' + ' / '}${this.hardware?.name ?? ''}`,
			},
		].filter((det) => !!det?.value && det?.value !== ' / ');
	}

	onOpen(equipment: Equipment): void {
		this.opened.emit(equipment);
	}
}
