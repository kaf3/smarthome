import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { valueof } from '@models/common';

export interface Visit {
	[urlKey: string]: string;
}

@Injectable({
	providedIn: 'root',
})
export class LastVisitedService {
	private _visitState = new BehaviorSubject<Visit>({});

	get visitState$(): Observable<Visit> {
		return this._visitState.pipe();
	}

	get visitSnap(): Visit {
		return this._visitState.getValue();
	}

	addVisit(visit: Visit): void {
		this._visitState.next({ ...this.visitSnap, ...visit });
	}

	addOne(key: keyof Visit, val: valueof<Visit>): void {
		this._visitState.next({ ...this.visitSnap, [key]: val });
	}

	remove(visitKey: keyof Visit): void {
		const entries = Object.entries(this.visitSnap).filter(([key, _val]) => key !== visitKey);
		this._visitState.next(Object.fromEntries(entries));
	}

	getUrl(visitKey: keyof Visit): valueof<Visit> {
		return this.visitSnap[visitKey];
	}

	private buildChain(visitKey: keyof Visit, partChain: string[]): string[] {
		const val = this.getUrl(visitKey);
		if (partChain.includes(val)) {
			console.error('urls closure detected!');
			return partChain;
		}

		if (val) {
			return this.buildChain(val, [...partChain, val]);
		}
		return partChain;
	}

	getChain(visitKey: keyof Visit): string[] {
		return this.buildChain(visitKey, [visitKey as string]);
	}
}
