import { Injectable, InjectionToken, Injector } from '@angular/core';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { CurtainComponent } from '../ui/curtain/curtain.component';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { filter, take } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';

export interface CurtainConfig<CurtainData = any> {
	panelClass?: string;
	hasBackdrop?: boolean;
	backdropClass?: string;
	data?: CurtainData;
}

interface CurtainContainer<Component, CurtainData = any> {
	componentRef: ComponentType<Component>;
	overlayRef: OverlayRef;
	config: CurtainConfig<CurtainData>;
}

// Keycode for ESCAPE
const ESCAPE = 'Escape';

export const CURTAIN_DATA = new InjectionToken<any>('curtain_data');

export class CurtainRef<Cmp = any> {
	constructor(
		private overlayRef: OverlayRef,
		public component: ComponentType<Cmp>,
		public data: any,
	) {}

	close(): void {
		this.setBeforeClosed();

		this.animationStarted
			.pipe(
				filter((event) => event.toState === 'leave'),
				take(1),
			)
			.subscribe(() => {
				this.overlayRef.detachBackdrop();
			});
		this.animationDone
			.pipe(
				filter((event) => event.toState === 'leave'),
				take(1),
			)
			.subscribe(() => {
				this.overlayRef.dispose();
			});

		this.overlayRef
			.detachments()
			.pipe(take(1))
			.subscribe(() => {
				this.setAfterClosed();
				this.animationComplete();
			});
	}

	private _beforeClose = new Subject<void>();
	private _afterClosed = new Subject<void>();
	private _animationStarted = new Subject<AnimationEvent>();
	private _animationDone = new Subject<AnimationEvent>();

	public backdropClickEvent(): Observable<MouseEvent> {
		return this.overlayRef.backdropClick();
	}

	get afterClosed(): Observable<void> {
		return this._afterClosed.pipe();
	}

	get beforeClose(): Observable<void> {
		return this._beforeClose.pipe();
	}

	get animationStarted(): Observable<AnimationEvent> {
		return this._animationStarted.pipe();
	}

	get animationDone(): Observable<AnimationEvent> {
		return this._animationDone.pipe();
	}

	setAfterClosed(): void {
		this._afterClosed.next();
		this._afterClosed.complete();
	}

	setBeforeClosed(): void {
		this._beforeClose.next();
		this._beforeClose.complete();
	}

	setAnimationStarted(event: AnimationEvent): void {
		this._animationStarted.next(event);
	}

	setAnimationDone(event: AnimationEvent): void {
		this._animationDone.next(event);
	}
	animationComplete() {
		this._animationStarted.complete();
		this._animationDone.complete();
	}
}

@Injectable({
	providedIn: 'root',
})
export class CurtainService<Component> {
	public overlayRef?: OverlayRef;

	static DEFAULT_CONFIG: CurtainConfig = {
		hasBackdrop: true,
		//backdropClass: 'dark-backdrop',
		//panelClass: 'cdk-overlay-custom-panel',
	};

	constructor(private readonly overlay: Overlay, private readonly injector: Injector) {}

	private createOverlay<CurtainData = any>(config: CurtainConfig<CurtainData>): OverlayRef {
		const overlayConfig = this.getOverlayConfig<CurtainData>(config);

		return this.overlay.create(overlayConfig);
	}

	private closeStrategy(overlayRef?: OverlayRef): void {
		if (overlayRef?.hasAttached()) {
			overlayRef?.keydownEvents().subscribe((event: KeyboardEvent) => {
				console.log(event);
				if (event.key === ESCAPE) {
					this.close();
				}
			});
		}
	}

	private attachCurtainContainer<Cmp, CurtainData = any>(
		container: CurtainContainer<Cmp, CurtainData>,
	): { curtainRef: CurtainRef; curtainComponent: CurtainComponent } {
		const { componentRef, config, overlayRef } = container;
		const curtainRef = new CurtainRef<Cmp>(overlayRef, componentRef, config.data);
		const injector = this.createInjector<CurtainData>(config, curtainRef);

		const curtainComponent = overlayRef.attach(
			new ComponentPortal(CurtainComponent, null, injector),
		).instance;

		return { curtainRef, curtainComponent };
	}

	public open<CurtainData = any>(
		componentRef: ComponentType<Component>,
		config: CurtainConfig<CurtainData> = {},
	): CurtainRef {
		this.overlayRef = this.createOverlay({ ...CurtainService.DEFAULT_CONFIG, ...config });
		const { curtainRef } = this.attachCurtainContainer<Component, CurtainData>({
			config,
			componentRef,
			overlayRef: this.overlayRef,
		});

		this.closeStrategy(this.overlayRef);

		return curtainRef;
	}

	public close(): void {
		if (this.overlayRef) {
			this.overlayRef.detach();
		}
	}

	private getOverlayConfig<CurtainData = any>(config: CurtainConfig<CurtainData>): OverlayConfig {
		const positionStrategy = this.overlay.position().global().centerVertically().right('0px');

		return new OverlayConfig({
			hasBackdrop: config.hasBackdrop,
			backdropClass: config.backdropClass,
			panelClass: config.panelClass,
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			positionStrategy,
		});
	}

	private createInjector<CurtainData = any>(
		config: CurtainConfig<CurtainData>,
		curtainRef: CurtainRef,
	): PortalInjector {
		// Instantiate new WeakMap for our custom injection tokens
		const injectionTokens = new WeakMap();

		// Set custom injection tokens
		injectionTokens.set(CurtainRef, curtainRef);
		injectionTokens.set(CURTAIN_DATA, config.data);

		// Instantiate new PortalInjector
		return new PortalInjector(this.injector, injectionTokens);
	}
}
