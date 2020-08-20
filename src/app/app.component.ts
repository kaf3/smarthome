import { Component, OnInit } from '@angular/core';
import { LastVisitedService } from './services/last-visited.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'Smart Home';

	constructor(private visitedService: LastVisitedService) {}

	ngOnInit(): void {
		this.visitedService.add({ room: 'hard' });
		this.visitedService.add({ hard: 'eqp' });
		this.visitedService.add({ eqp: 'foo' });
		this.visitedService.add({ foo: 'hard' });
		console.log(this.visitedService.visitSnap);
		console.log(this.visitedService.getChain('foo'));
	}
}
