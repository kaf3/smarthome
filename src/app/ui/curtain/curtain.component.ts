import { AfterContentInit, Component, Inject, Injector } from '@angular/core';
import { _INTERNAL_CURTAIN_DATA, CURTAIN_DATA, CurtainRef } from '../../services/curtain.service';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { take } from 'rxjs/operators';

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
			state('leave', style({ transform: 'translateX(100%)', opacity: 0 })),
			transition('* => *', animate(ANIMATION_TIMINGS)),
		]),
	],
})
export class CurtainComponent implements AfterContentInit {
	public portal: ComponentPortal<ComponentType<any>>;

	animationState: 'void' | 'enter' | 'leave' = 'enter';

	constructor(
		@Inject(_INTERNAL_CURTAIN_DATA) public data: any,
		private curtainRef: CurtainRef,
		private injector: Injector,
	) {}

	ngAfterContentInit(): void {
		const injector = this.createInjector();
		this.portal = new ComponentPortal(this.curtainRef.component, null, injector);

		this.curtainRef.beforeClose.pipe(take(1)).subscribe(() => {
			this.startExitAnimation();
		});
	}

	createInjector(): PortalInjector {
		// Instantiate new WeakMap for our custom injection tokens
		const injectionTokens = new WeakMap();

		// Set custom injection tokens
		injectionTokens.set(CURTAIN_DATA, this.data);
		injectionTokens.set(CurtainRef, this.curtainRef);

		// Instantiate new PortalInjector
		return new PortalInjector(this.injector, injectionTokens);
	}

	startExitAnimation(): void {
		this.animationState = 'leave';
	}

	onAnimationStart(event: AnimationEvent) {
		this.curtainRef.setAnimationStarted(event);
	}

	onAnimationDone(event: AnimationEvent) {
		this.curtainRef.setAnimationDone(event);
	}
}
