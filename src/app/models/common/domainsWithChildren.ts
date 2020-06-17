import { BaseDomain } from '@models/common/baseDomain';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ExtractPropsByType } from './utility-types';
import { RoomList } from '../room-list';
import { Room } from '../room';
import { SelfCtor } from './constructor';
import { Collection } from './collection';

type e = ExtractPropsByType<RoomList, Room[]>;

interface IHostDomain<TChild> {
	[childNames: string]: TChild[];
}

export function HostDomainFactory<TChild extends BaseDomain, THost extends IHostDomain<TChild>>(
	childNames: ExtractPropsByType<THost, TChild[]>,
	Host: SelfCtor<THost>,
) {
	return class HostDomain implements IHostDomain<TChild> {
		[childNames: string]: TChild[];

		private static adapter = createEntityAdapter<TChild>({
			selectId: (child) => child.id ?? '',
			sortComparer: false,
		});

		private static createEntityState(host: THost): EntityState<TChild> {
			if (Array.isArray(host[childNames])) {
				const childes = host[childNames];
				return this.adapter.addAll(childes, this.adapter.getInitialState());
			}
			return this.adapter.getInitialState();
		}

		public static updateChild(host: THost, child: TChild) {
			let entity = this.createEntityState(host);
			entity = this.adapter.upsertOne(child, entity);
			return new Host({
				...host,
				[childNames]: Object.values(entity.entities as Collection<TChild>),
			});
		}
	};
}
