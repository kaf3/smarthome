import { Dictionary } from '@ngrx/entity';
import { Collection, SelfCtor } from '@models/common';

export interface HasId {
	id: string;
}

export class DTO {
	static createCollection<T extends HasId>(entityArray: T[]): Collection<T> {
		const map = new Map();
		entityArray.forEach((entity) => map.set(entity.id, entity));
		return Object.fromEntries(map);
	}

	static createArray<T extends HasId>(entityCollection: Dictionary<T>, ctor: SelfCtor<T>): T[] {
		return Object.entries(entityCollection).map(
			([key, value]) => new ctor({ ...value, id: key }),
		);
	}
}
