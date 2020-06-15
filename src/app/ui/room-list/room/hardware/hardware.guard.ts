import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { HardwareFacade } from '@store/hardware';
import { filter, mapTo, take } from 'rxjs/operators';

@Injectable()
export class HardwareGuard implements CanActivate {
	constructor(private readonly hardwareFacade: HardwareFacade) {}

	canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {
		this.hardwareFacade.loadHardware(next.params['hardwareId']);
		return this.hardwareFacade.hardware$.pipe(
			filter((hardware) => !!hardware?.id),
			take(1),
			mapTo(true),
		);
	}
}
