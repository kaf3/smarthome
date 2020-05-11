import { Injectable } from '@angular/core';
import { Equipment, RoomDTO } from '@models';

@Injectable()
export class SerializeService {
	public serializeEquipment(equipment: Equipment): RoomDTO {
		const equipmentDTO: RoomDTO = {
			// eslint-disable-next-line @typescript-eslint/camelcase
			r_name: equipment.location,
		};
		const { id } = equipment;
		const group = SerializeService.getGroupDTO(equipment.group);

		let key: keyof RoomDTO = group + '_' + id;

		equipmentDTO[key] = equipment.value;
		key = 'n' + '_' + id;
		equipmentDTO[key] = equipment.name;
		key = 'u' + '_' + id;
		equipmentDTO[key] = equipment.update ? equipment.update.toDateString() : '';
		key = 'm' + '_' + id;
		equipmentDTO[key] = equipment.mac;

		return equipmentDTO;
	}

	public serializeRoom(equipmentDTO: RoomDTO, roomDTO: RoomDTO): RoomDTO {
		return Object.assign(roomDTO, equipmentDTO);
	}

	private static getTypeDTO(key: Equipment['type']): string {
		const switcher = {
			humidity: 'humi',
			temperature: 'temp',
			co2: 'co2-',
			kettle: 'kett',
			toaster: 'toas',
		};

		return switcher[key].slice(0, 4);
	}

	private static getGroupDTO(key: Equipment['group']): string {
		const switcher = {
			sensor: 's',
			device: 'd',
		};

		return switcher[key][0];
	}
}
