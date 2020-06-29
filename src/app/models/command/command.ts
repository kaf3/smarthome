import { BaseDomain, OmitByPropType } from '@models/common';
import { Matchers } from '@helpers';

export type CommandDTOProps = OmitByPropType<CommandDTO, Function>;

export class CommandDTO {
	public readonly body: string | null;
	public readonly name: string;
	createDomain: (id: Command['id'], _oldCommand?: Command) => Command;

	constructor(source: CommandDTO | CommandDTOProps) {
		this.name = source.name;
		const body = source.body;
		/*		if (body === null || Matchers.commandBodyMatcher(body)) {
			this.body = body;
		} else {
			throw new Error(`Command ${source.name} has incorrect body ${source.body}`);
		}*/
		this.body = body;
	}
}

export class Command extends BaseDomain {
	public readonly body: string | null;

	constructor(source: Command) {
		super(source.id, source.name);
		const body = source.body;
		if (body === null || Matchers.commandBodyMatcher(body)) {
			this.body = body;
		} else {
			throw new Error(`Command ${source.name} has incorrect body ${source.body}`);
		}
		this.body = body;
		Matchers.bodyParser(body);
	}

	public static createDTO(command: Command): CommandDTO {
		return new CommandDTO({
			name: command.name,
			body: command.body,
		});
	}

	static initial = new Command({ ...BaseDomain.initial, body: null });
}

Object.defineProperty(CommandDTO.prototype, 'createDomain', {
	enumerable: false,
	value: function (id: Command['id'], _oldCommand?: Command): Command {
		return new Command({
			id,
			name: this.name,
			body: this.body,
		});
	},
});
