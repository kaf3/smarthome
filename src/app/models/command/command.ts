import { BaseDomain, OmitByPropType } from '@models/common';
import { Matchers } from '@helpers';
import { Equipment } from '@models/equipment';
import { Room } from '@models/room';
import { Hardware } from '@models/hardware';

export type Comparator = '>' | '<' | '=';
export type CommandType = 'byEvent';

export interface CommandObject {
	equipmentId: Equipment['id'];
	roomId: Room['id'];
	hardwareId: Hardware['id'];
}

export interface CommandSensor extends CommandObject {
	value: Equipment['value'];
	comparator: Comparator;
}

export interface CommandDevice extends CommandObject {
	value: Equipment['value'];
}

export interface CommandBody {
	trigger: CommandSensor | number;
	result: CommandDevice;
}

export class CommandProcessor {
	private static eqpPath = `${Matchers.pushId}\\*${Matchers.pushId}\\*[\\w-]{4}`;

	private static bodyEventSensor = `${CommandProcessor.eqpPath}\\*[<>=]\\*\\w+`;

	private static bodyResult = `${CommandProcessor.eqpPath}\\*\\d`;

	static commandBodyMatcher(body: CommandDTO['body']): boolean {
		return !!body && new RegExp(`^#${this.bodyEventSensor}\\*${this.bodyResult}$`).test(body);
	}

	static bodyParser(body: CommandDTO['body'], type: CommandType): Command['body'] {
		let trigger: CommandBody['trigger'];
		if (type === 'byEvent') {
			const sensorData = (new RegExp(this.bodyEventSensor).exec(body ?? '') ?? [''])[0].split(
				'*',
			);
			trigger = {
				roomId: sensorData[0],
				hardwareId: sensorData[1],
				equipmentId: sensorData[2],
				comparator: sensorData[3] as Comparator,
				value: sensorData[4],
			};
		} else {
			trigger = 0;
		}
		const result = (new RegExp(this.bodyResult).exec(body ?? '') ?? [''])[0].split('*');
		return {
			trigger,
			result: {
				roomId: result[0],
				hardwareId: result[1],
				equipmentId: result[2],
				value: !!Number.parseInt(result[3]),
			},
		};
	}

	static bodySerializer(body: Command['body'], type: CommandType): CommandDTO['body'] {
		let trigger: string;
		if (type === 'byEvent') {
			const triggerObj = body?.trigger as CommandSensor;
			trigger = `#${triggerObj.roomId}*${triggerObj.hardwareId}*${triggerObj.equipmentId}*${triggerObj.comparator}*${triggerObj.value}`;
		} else trigger = '0';
		const result = `${body?.result.roomId}*${body?.result.hardwareId}*${
			body?.result.equipmentId
		}*${!!body?.result.value ? '1' : '0'}`;

		return `${trigger}*${result}`;
	}
}

export type CommandDTOProps = OmitByPropType<CommandDTO, Function>;

export class CommandDTO {
	public readonly body: string | null;

	public readonly name: string;

	createDomain: (id: Command['id'], _oldCommand?: Command) => Command;

	constructor(source: CommandDTO | CommandDTOProps) {
		this.name = source.name;
		const { body } = source;
		/*		if (body === null || Matchers.commandBodyMatcher(body)) {
			this.body = body;
		} else {
			throw new Error(`Command ${source.name} has incorrect body ${source.body}`);
		} */
		this.body = body;
	}
}

export class Command extends BaseDomain {
	public readonly body: CommandBody | null;

	constructor(source: Command) {
		super(source.id, source.name);
		this.body = source.body;
	}

	public static createDTO(command: Command): CommandDTO {
		return new CommandDTO({
			name: command.name,
			body: CommandProcessor.bodySerializer(command.body, 'byEvent'),
		});
	}

	static initial = new Command({ ...BaseDomain.initial, body: null });
}

Object.defineProperty(CommandDTO.prototype, 'createDomain', {
	enumerable: false,
	value(id: Command['id'], _oldCommand?: Command): Command {
		return new Command({
			id,
			name: this.name,
			body: CommandProcessor.bodyParser(this.body, 'byEvent'),
		});
	},
});
