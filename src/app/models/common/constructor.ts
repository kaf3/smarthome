export interface Ctor<T> {
	new (...args): T;
}

export interface SelfCtor<T> {
	new (obj: T): T;
}
