export class BaseDomain {
	protected constructor(public readonly id: string | null, public readonly name: string) {}

	static readonly initial = new BaseDomain(null, '');
}
