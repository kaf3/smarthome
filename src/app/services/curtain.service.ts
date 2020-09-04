import { Injectable, InjectionToken, Injector } from '@angular/core';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { CurtainComponent } from '../ui/curtain/curtain.component';

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
const ESCAPE = 27;

export const CURTAIN_DATA = new InjectionToken<any>('curtain_data');

export class CurtainRef<Cmp = any> {
	constructor(
		private overlayRef: OverlayRef,
		public component: ComponentType<Cmp>,
		public data: any,
	) {}

	close(): void {
		if (this.overlayRef) {
			this.overlayRef.detach();
		}
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
			overlayRef?.backdropClick().subscribe((_) => this.close());
			overlayRef?.keydownEvents().subscribe((event: KeyboardEvent) => {
				console.log(event);
				if (event.keyCode === ESCAPE) {
					this.close();
				}
			});
		}
	}

	private attachCurtainContainer<Cmp, CurtainData = any>(
		container: CurtainContainer<Cmp, CurtainData>,
	): CurtainComponent {
		const { componentRef, config, overlayRef } = container;
		const injector = this.createInjector<CurtainData>(
			config,
			new CurtainRef<Cmp>(overlayRef, componentRef, config.data),
		);

		const containerRef = overlayRef.attach(
			new ComponentPortal(CurtainComponent, null, injector),
		);

		return containerRef.instance;
	}

	public open<CurtainData = any>(
		componentRef: ComponentType<Component>,
		config: CurtainConfig<CurtainData> = {},
	): CurtainComponent {
		this.overlayRef = this.createOverlay({ ...CurtainService.DEFAULT_CONFIG, ...config });
		const cmp = this.attachCurtainContainer<Component, CurtainData>({
			config,
			componentRef,
			overlayRef: this.overlayRef,
		});

		this.closeStrategy(this.overlayRef);

		return cmp;
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
