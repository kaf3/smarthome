export function checkById<T extends { id: string }>(id: string) {
	return (target: T): boolean => target.id === id;
}
