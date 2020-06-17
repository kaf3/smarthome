import { BaseDomain } from '@models/common/baseDomain';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ExtractPropsByType } from './utility-types';
import { Ctor } from './constructor';
import { Collection } from './collection';

export interface HostDomainConstructor<THost, TChild extends BaseDomain> {
	new (...args): {};
	//adapter: EntityAdapter<TChild>;
	//createEntityState: (host: THost) => EntityState<TChild>;
	updateChild: (host: THost, child: TChild) => THost;
	addChild: (host: THost, child: TChild) => THost;
	updateManyChild: (host: THost, children: TChild[]) => THost;
	deleteChild: (host: THost, child: TChild) => THost;
	getChild: (id: TChild['id'], host?: THost) => TChild | undefined;
}

export function mixinHostDomain<TBase extends Ctor<{}>>(base: TBase) {
	return function HostDomainFactory<
		THost extends Record<TChildNames, TChild[]>,
		TChild extends BaseDomain,
		TChildNames extends ExtractPropsByType<THost, TChild[]>
	>(childNames: TChildNames): HostDomainConstructor<THost, TChild> & TBase {
		return class extends base {
			private static adapter = createEntityAdapter<TChild>({
				selectId: (child) => child.id ?? '',
				sortComparer: false,
			});

			private static createEntityState(host: THost): EntityState<TChild> {
				if (Array.isArray(host[childNames])) {
					return this.adapter.addAll(host[childNames], this.adapter.getInitialState());
				}
				return this.adapter.getInitialState();
			}

			public static updateChild(host: THost, child: TChild): THost {
				let entity = this.createEntityState(host);
				entity = this.adapter.upsertOne(child, entity);
				return {
					...host,
					[childNames]: Object.values(entity.entities as Collection<TChild>),
				};
			}

			public static addChild(host: THost, child: TChild): THost {
				let entity = this.createEntityState(host);
				entity = this.adapter.addOne(child, entity);
				return {
					...host,
					[childNames]: Object.values(entity.entities as Collection<TChild>),
				};
			}

			public static updateManyChild(host: THost, children: TChild[]): THost {
				let entity = this.createEntityState(host);
				entity = this.adapter.upsertMany(children, entity);
				return {
					...host,
					[childNames]: Object.values(entity.entities as Collection<TChild>),
				};
			}

			public static deleteChild(host: THost, child: TChild): THost {
				let entity = this.createEntityState(host);
				entity = this.adapter.removeOne(child.id ?? '', entity);
				return {
					...host,
					[childNames]: Object.values(entity.entities as Collection<TChild>),
				};
			}

			public static getChild(id: TChild['id'], host?: THost): TChild | undefined {
				if (host) {
					return this.createEntityState(host).entities[id ?? ''];
				}
				return undefined;
			}
		};
	};
}

class Base {}

export const HostDomain = mixinHostDomain(Base);
export const HostBaseDomain = mixinHostDomain(BaseDomain);
