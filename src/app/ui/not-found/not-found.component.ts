import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
	public target: Observable<string | null>;

	constructor(private readonly activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.target = this.activatedRoute.queryParamMap.pipe(
			map((paramMap) => paramMap.get('target'), share()),
		);
	}
}
