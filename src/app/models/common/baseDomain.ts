export class BaseDomain {
	constructor(public readonly id: string | null, public name: string) {}

	static readonly initial = new BaseDomain(null, '');
}
