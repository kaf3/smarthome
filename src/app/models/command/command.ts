import { BaseDomain, OmitByPropType } from '@models/common';
import { createEntityAdapter, Dictionary, EntityState } from '@ngrx/entity';
import { Matchers } from '@helpers';

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
		if (Matchers.commandBodyMatcher(source.body)) {
			this.body = source.body;
		}
		throw new Error(`Command ${source.name} has incorrect body ${source.body}`);
	}

	public static createDTO(command: Command): CommandDTO {
		return new CommandDTO({
			name: command.name,
			body: command.body,
		});
	}

	static initial = new Command({ ...BaseDomain.initial, body: null });
}

export class CommandListDTO {
	commandCollection: Dictionary<CommandDTO>;

	constructor(source: CommandListDTO | CommandListDTOProps) {
		this.commandCollection = { ...source.commandCollection };
	}

	public createDomain(oldCommandList?: CommandList): CommandList {
		const ids: CommandList['commandEntityState']['ids'] = [];
		const entries = Object.entries(this.commandCollection).map(([id, commandDTO]) => {
			(ids as string[]).push(id);
			return [
				id,
				commandDTO?.createDomain(id, oldCommandList?.commandEntityState.entities[id]),
			];
		});
		return { commandEntityState: { ids, entities: Object.fromEntries(entries) } };
	}
}

export class CommandList {
	commandEntityState: EntityState<Command>;

	static adapter = createEntityAdapter<Command>({
		sortComparer: false,
		selectId: (cmd) => cmd.id ?? '',
	});

	constructor(source: CommandList | CommandListProps) {
		this.commandEntityState = { ...source.commandEntityState };
	}

	public static createCommandCollection(commandList: CommandList): Dictionary<CommandDTO> {
		const commandCollection: Dictionary<CommandDTO> = {};
		Object.entries(commandList.commandEntityState.entities).forEach(
			([id, command]) =>
				(commandCollection[id] = Command.createDTO(command ?? Command.initial)),
		);
		return commandCollection;
	}

	public static addCommand(commandList: CommandList, command: Command): CommandList {
		return new CommandList({
			...commandList,
			commandEntityState: CommandList.adapter.addOne(command, commandList.commandEntityState),
		});
	}

	public static updateCommand(commandList: CommandList, command: Command): CommandList {
		return new CommandList({
			...commandList,
			commandEntityState: CommandList.adapter.upsertOne(
				command,
				commandList.commandEntityState,
			),
		});
	}

	public static deleteCommand(commandList: CommandList, command: Command): CommandList {
		return new CommandList({
			...commandList,
			commandEntityState: CommandList.adapter.removeOne(
				String(command.id),
				commandList.commandEntityState,
			),
		});
	}

	static initial = new CommandList({ commandEntityState: CommandList.adapter.getInitialState() });
}
