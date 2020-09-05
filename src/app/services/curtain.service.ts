import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { CurtainComponent } from '../ui/curtain/curtain.component';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { filter, take } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';

export interface CurtainConfig<CurtainData = any> {
	panelClass?: string;
	hasBackdrop?: boolean;
	backdropClass?: string;
	data?: CurtainData;
	keycodesForClose?: string[];
}

export type CurtainState = 'opened' | 'closed';

interface CurtainContainer<Component, CurtainData = any> {
	componentRef: ComponentType<Component>;
	overlayRef: OverlayRef;
	curtainConfig: CurtainConfig<CurtainData>;
}

// Keycode for ESCAPE
const ESCAPE = 'Escape';

export const CURTAIN_DATA = new InjectionToken<any>('curtain_data');
export const _INTERNAL_CURTAIN_DATA = new InjectionToken<any>('internal_curtain_data');

export const CURTAIN_DEFAULT_CONFIG = new InjectionToken<CurtainConfig>('curtain_config');

export class CurtainRef<Cmp = any> {
	constructor(private overlayRef: OverlayRef, public component: ComponentType<Cmp>) {}

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
		panelClass: 'cdk-overlay-curtain-panel',
		keycodesForClose: [ESCAPE],
	};

	private readonly _curtainState = new BehaviorSubject<CurtainState>('closed');

	get curtainState(): Observable<CurtainState> {
		return this._curtainState.pipe();
	}

	get curtainStateSnap(): CurtainState {
		return this._curtainState.getValue();
	}

	setCurtainState(state: CurtainState): void {
		this._curtainState.next(state);
	}

	constructor(
		private readonly overlay: Overlay,
		private readonly injector: Injector,
		@Optional()
		@Inject(CURTAIN_DEFAULT_CONFIG)
		public curtainDefaultConfig: CurtainConfig,
	) {
		if (curtainDefaultConfig === null) {
			this.curtainDefaultConfig = CurtainService.DEFAULT_CONFIG;
		}
	}

	private createOverlay<CurtainData = any>(config: CurtainConfig<CurtainData>): OverlayRef {
		const overlayConfig = this.getOverlayConfig<CurtainData>(config);

		return this.overlay.create(overlayConfig);
	}

	private closeStrategy(overlayRef: OverlayRef, config: CurtainConfig): void {
		if (overlayRef?.hasAttached()) {
			overlayRef?.keydownEvents().subscribe((event: KeyboardEvent) => {
				if (config.keycodesForClose?.find((keycode) => event.key === keycode)) {
					this.overlayRef?.detach();
				}
			});
		}
	}

	private attachCurtainContainer<Cmp, CurtainData = any>(
		container: CurtainContainer<Cmp, CurtainData>,
	): { curtainRef: CurtainRef; curtainComponent: CurtainComponent } {
		const { componentRef, curtainConfig, overlayRef } = container;
		const curtainRef = new CurtainRef<Cmp>(overlayRef, componentRef);
		const injector = this.createInjector<CurtainData>(curtainConfig, curtainRef);

		const curtainComponent = overlayRef.attach(
			new ComponentPortal(CurtainComponent, null, injector),
		).instance;

		return { curtainRef, curtainComponent };
	}

	public open<CurtainData = any>(
		componentRef: ComponentType<Component>,
		config: CurtainConfig<CurtainData> = {},
	): CurtainRef {
		const curtainConfig: CurtainConfig = { ...this.curtainDefaultConfig, ...config };
		this.overlayRef = this.createOverlay(curtainConfig);
		const { curtainRef } = this.attachCurtainContainer<Component, CurtainData>({
			curtainConfig,
			componentRef,
			overlayRef: this.overlayRef,
		});

		this.closeStrategy(this.overlayRef, curtainConfig);

		if (this.overlayRef.hasAttached()) {
			this.setCurtainState('opened');
		}

		this.overlayRef.detachments().subscribe((_) => this.setCurtainState('closed'));

		return curtainRef;
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
		injectionTokens.set(_INTERNAL_CURTAIN_DATA, config.data);

		// Instantiate new PortalInjector
		return new PortalInjector(this.injector, injectionTokens);
	}
}
