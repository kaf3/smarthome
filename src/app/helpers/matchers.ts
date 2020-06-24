export class Matchers {
	private static pushId = '[\\w-]{20}';

	static urlRoomMatcher(url: string): boolean {
		return new RegExp(`^/rooms/${Matchers.pushId}$`).test(url);
		//return /^\/rooms\/[\w-]{20}$/.test(url);
	}

	static urlRoomsMatcher(url: string): boolean {
		return /^\/rooms$/.test(url);
	}

	static commandBodyMatcher(body?: string): boolean {
		const eqpType = '[\\w-]{4}';
		const eqpPath = `${Matchers.pushId}\\*${Matchers.pushId}\\*${eqpType}`;
		return !!body && new RegExp(`^#${eqpPath}\\*[<>=]\\*\\w+\\*${eqpPath}\\*\\d$`).test(body);
	}
}
