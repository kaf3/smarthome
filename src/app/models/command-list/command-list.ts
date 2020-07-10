import { createEntityAdapter, Dictionary, EntityState } from '@ngrx/entity';
import { OmitByPropType } from '../common';
import { Command, CommandDTO } from '../command/command';

export type CommandListDTOProps = OmitByPropType<CommandListDTO, Function>;
export type CommandListProps = OmitByPropType<CommandList, Function>;

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
				new CommandDTO({ ...(commandDTO as CommandDTO) }).createDomain(
					id,
					oldCommandList?.commandEntityState.entities[id],
				),
			];
		});

		return new CommandList({
			commandEntityState: { ids, entities: Object.fromEntries(entries) },
		});
	}
}
