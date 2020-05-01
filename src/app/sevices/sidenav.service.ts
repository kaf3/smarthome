import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SidenavService {
    private readonly sidenavSubject = new BehaviorSubject<boolean>(false);

    public setState(value: boolean): void {
        this.sidenavSubject.next(value);
    }

    public getState(): Observable<boolean> {
        return this.sidenavSubject.asObservable();
    }

    constructor() {}
}
