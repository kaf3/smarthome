import { valueof } from '@models/common';

export interface Dictionary {
	toDTO: Record<string, string>;
	toDomain: Record<string, string>;
}

export function createDictionary(
	DTO: Dictionary['toDTO'],
	domain: Dictionary['toDomain'],
): Dictionary {
	if (!(DTO instanceof Object) || !(domain instanceof Object)) {
		throw new Error(`${DTO} and ${domain} aren't objects`);
	}
	let toDomainMap: any = new Map();
	let toDTOMap: any = new Map();
	Object.keys(DTO).forEach((key) => {
		if (!!domain[key]) toDomainMap.set(DTO[key], domain[key]);
	});
	Object.keys(domain).forEach((key) => {
		if (!!DTO[key]) toDTOMap.set(domain[key], DTO[key]);
	});
	toDomainMap = Object.fromEntries(toDomainMap);
	toDTOMap = Object.fromEntries(toDTOMap);
	return { toDTO: toDTOMap, toDomain: toDomainMap };
}

export const directedDictionary = (target: valueof<Dictionary>): valueof<Dictionary> =>
	new Proxy(target, {
		get(target: any, p: PropertyKey): string {
			return Object.hasOwnProperty.call(target, p) ? target[p] : p;
		},
	});

export const toDomainDictionary = (dictionary: Dictionary): ReturnType<typeof directedDictionary> =>
	directedDictionary(dictionary.toDomain);

export const toDTODictionary = (dictionary: Dictionary): ReturnType<typeof directedDictionary> =>
	directedDictionary(dictionary.toDTO);
