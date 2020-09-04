import { AfterContentInit, Component, Injector } from '@angular/core';
import { CURTAIN_DATA, CurtainRef } from '../../services/curtain.service';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { animate, state, style, transition, trigger } from '@angular/animations';

// Reusable animation timings
const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
	selector: 'app-curtain',
	templateUrl: './curtain.component.html',
	styleUrls: ['./curtain.component.scss'],
	animations: [
		trigger('fade', [
			state('fadeOut', style({ opacity: 0 })),
			state('fadeIn', style({ opacity: 1 })),
			transition('* => fadeIn', animate(ANIMATION_TIMINGS)),
		]),
		trigger('slideCurtain', [
			state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
			state('enter', style({ transform: 'translateX(0)', opacity: 1 })),
			state('leave', style({ transform: '-100%', opacity: 0 })),
			transition('* => *', animate(ANIMATION_TIMINGS)),
		]),
	],
})
export class CurtainComponent implements AfterContentInit {
	public portal: ComponentPortal<ComponentType<any>>;

	animationState: 'void' | 'enter' | 'leave' = 'enter';

	constructor(private curtainRef: CurtainRef, private injector: Injector) {}

	ngAfterContentInit(): void {
		const injector = this.createInjector();
		this.portal = new ComponentPortal(this.curtainRef.component, null, injector);
	}

	createInjector(): PortalInjector {
		// Instantiate new WeakMap for our custom injection tokens
		const injectionTokens = new WeakMap();

		// Set custom injection tokens
		injectionTokens.set(CURTAIN_DATA, this.curtainRef.data);

		// Instantiate new PortalInjector
		return new PortalInjector(this.injector, injectionTokens);
	}
}
