export class BaseDomain {
	protected constructor(public readonly id: string | null, public name: string) {}

	static readonly initial = new BaseDomain(null, '');
}
