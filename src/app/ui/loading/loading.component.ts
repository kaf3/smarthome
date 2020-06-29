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
import { merge, Subject } from 'rxjs';
import { CommandListFacade } from '@store/command-list';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnDestroy, AfterViewInit {
	public readonly destroy$ = new Subject();

	@ViewChild('loadRef') public readonly loadRef: TemplateRef<any>;

	constructor(
		private readonly roomListFacade: RoomListFacade,
		private readonly commandListFacade: CommandListFacade,
		private readonly load: LoadingService,
		public readonly vcr: ViewContainerRef,
	) {}

	ngAfterViewInit(): void {
		merge(this.roomListFacade.loading$, this.commandListFacade.loading$)
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				this.load.open(this.loadRef, this.vcr);
			});
		merge(
			this.roomListFacade.error$,
			this.roomListFacade.loaded$,
			this.commandListFacade.error$,
			this.commandListFacade.loaded$,
		)
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
