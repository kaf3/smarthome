import {
	AfterViewInit,
	Component,
	OnDestroy,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { RoomListFacade } from '@store/room-list';
import { takeUntil } from 'rxjs/operators';
import { LoadingService } from '@services';
import { race, Subject } from 'rxjs';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnDestroy, AfterViewInit {
	public readonly destroy$ = new Subject();

	@ViewChild('loadRef') public readonly loadRef: TemplateRef<any>;

	constructor(
		private readonly roomListFacade: RoomListFacade,
		private readonly load: LoadingService,
		public readonly vcr: ViewContainerRef,
	) {}

	ngAfterViewInit(): void {
		this.roomListFacade.loading$.pipe(takeUntil(this.destroy$)).subscribe(() => {
			this.load.open(this.loadRef, this.vcr);
		});
		race(this.roomListFacade.error$, this.roomListFacade.loaded$)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				this.load.close();
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
