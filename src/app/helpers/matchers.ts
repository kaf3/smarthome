export class Matchers {
	public static pushId = '[\\w-]{20}';

	static urlRoomMatcher(url: string): boolean {
		return new RegExp(`^/rooms/${Matchers.pushId}$`).test(url);
		// return /^\/rooms\/[\w-]{20}$/.test(url);
	}

	static urlRoomsMatcher(url: string): boolean {
		return /^\/rooms$/.test(url);
	}

	// #-MAN02LibdHPPTcgFeRZ*-MANBXXGr44pbIr4nafo*co2-*>*50*-MAN3OCDv10jwbNeIWq_*-MANCAM4zwH3387f8bC2*outl*0
}
