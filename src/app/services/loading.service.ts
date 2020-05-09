import {Injectable, TemplateRef, ViewContainerRef} from '@angular/core';
import {
    GlobalPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayRef,
} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

@Injectable()
export class LoadingService {
    public overlayRef?: OverlayRef;

    constructor(private readonly overlay: Overlay) {}

    public open<T = any>(
        templateRef: TemplateRef<any>,
        vcr: ViewContainerRef | null,
    ): OverlayRef {
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        this.overlayRef.attach(new TemplatePortal(templateRef, vcr));

        return this.overlayRef;
    }

    public close() {
        if (!!this.overlayRef) {
            this.overlayRef.detach();
        }
    }

    private getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            panelClass: 'cdk-overlay-custom-panel',
            positionStrategy: this.getPositionStrategy(),
        });
    }

    private getPositionStrategy(): GlobalPositionStrategy {
        return this.overlay
            .position()
            .global()
            .centerHorizontally();
    }
}
