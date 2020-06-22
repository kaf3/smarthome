import { BaseDomain, OmitByPropType } from '@models/common';
import { Dictionary, EntityState } from '@ngrx/entity';

export type CommandDTOProps = OmitByPropType<CommandDTO, Function>;
export type CommandListDTOProps = OmitByPropType<CommandListDTO, Function>;
export type CommandListProps = OmitByPropType<CommandList, Function>;

export class CommandDTO {
	public readonly body: string | null;
	public readonly name: string;

	constructor(source: CommandDTO | CommandDTOProps) {
		this.body = source.body;
		this.name = source.name;
	}

	public createDomain(id: Command['id'], _oldCommand?: Command): Command {
		return {
			id,
			name: this.name,
			body: this.body,
		};
	}
}

export class Command extends BaseDomain {
	public readonly body: string | null;

	constructor(source: Command) {
		super(source.id, source.name);
		this.body = source.body;
	}

	public static createDTO(command: Command): CommandDTO {
		return new CommandDTO({
			name: command.name,
			body: command.body,
		});
	}
}

export class CommandListDTO {
	commandCollection: Dictionary<CommandDTO>;

	constructor(source: CommandListDTO | CommandListDTOProps) {
		this.commandCollection = { ...source.commandCollection };
	}

	public createDomain(oldCommandList?: CommandList): CommandList {
		const ids: CommandList['ids'] = [];
		const entries = Object.entries(this.commandCollection).map(([id, commandDTO]) => {
			ids.push(id);
			return [id, commandDTO?.createDomain(id, oldCommandList?.entities[id])];
		});
		return { ids, entities: Object.fromEntries(entries) };
	}
}

export class CommandList implements EntityState<Command> {
	ids: string[];
	entities: Dictionary<Command>;

	constructor(source: CommandList | CommandListProps) {
		this.ids = source.ids;
		this.entities = source.entities;
	}

	public static createCommandCollection(commandList: CommandList): Dictionary<CommandDTO> {
		const entriesDTO: [Command['id'], CommandDTO][] = Object.entries(
			commandList,
		).map(([id, command]: [Command['id'], Command]) => [id, Command.createDTO(command)]);
		return Object.fromEntries(entriesDTO);
	}
}
