import { Room } from '@models/room';
import { Hardware } from '@models/hardware';
import { Equipment } from '@models/equipment';
import { Command } from '@models/command';

export interface Ids {
	roomId: Room['id'];
	hardwareId: Hardware['id'];
	equipmentId: Equipment['id'];
}

export class Matchers {
	private static pushId = '[\\w-]{20}';
	private static eqpPath = `${Matchers.pushId}\\*${Matchers.pushId}\\*[\\w-]{4}`;
	private static bodyEvent = `${Matchers.eqpPath}\\*[<>=]\\*\\w+`;
	private static bodyResult = `${Matchers.eqpPath}\\*\\d`;

	static urlRoomMatcher(url: string): boolean {
		return new RegExp(`^/rooms/${Matchers.pushId}$`).test(url);
		//return /^\/rooms\/[\w-]{20}$/.test(url);
	}

	static urlRoomsMatcher(url: string): boolean {
		return /^\/rooms$/.test(url);
	}

	static commandBodyMatcher(body: Command['body']): boolean {
		return !!body && new RegExp(`^#${Matchers.bodyEvent}\\*${Matchers.bodyResult}$`).test(body);
	}

	static bodyParser(body: Command['body']): { event: Ids; result: Ids } {
		const event = (new RegExp(Matchers.bodyEvent).exec(body ?? '') ?? [''])[0].split('*');
		const result = (new RegExp(Matchers.bodyResult).exec(body ?? '') ?? [''])[0].split('*');
		return {
			event: {
				roomId: event[0],
				hardwareId: event[1],
				equipmentId: event[2],
			},
			result: {
				roomId: result[0],
				hardwareId: result[1],
				equipmentId: result[2],
			},
		};
	}

	//#-MAN02LibdHPPTcgFeRZ*-MANBXXGr44pbIr4nafo*co2-*>*50*-MAN3OCDv10jwbNeIWq_*-MANCAM4zwH3387f8bC2*outl*0
}
