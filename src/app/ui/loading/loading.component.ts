import {
	AfterViewInit,
	Component,
	OnDestroy,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { RoomListStoreSelectors, RootStoreState } from '@store';
import { filter, takeUntil } from 'rxjs/operators';
import { LoadingService } from '@services';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnDestroy, AfterViewInit {
	public readonly destroy$ = new Subject();

	@ViewChild('loadRef') public readonly loadRef: TemplateRef<any>;

	constructor(
		private readonly store: Store<RootStoreState.AppState>,
		private readonly load: LoadingService,
		public readonly vcr: ViewContainerRef,
	) {}

	ngAfterViewInit(): void {
		this.store
			.select(RoomListStoreSelectors.selectLoading)
			.pipe(
				filter((load) => !!load),
				takeUntil(this.destroy$),
			)
			.subscribe(() => {
				this.load.open(this.loadRef, this.vcr);
			});

		this.store
			.select(RoomListStoreSelectors.selectLoaded)
			.pipe(
				filter((load) => !!load),
				takeUntil(this.destroy$),
			)
			.subscribe(() => {
				this.load.close();
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
