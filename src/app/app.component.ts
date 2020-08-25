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
		this.visitedService.addVisit({ room: 'hard' });
		this.visitedService.addVisit({ hard: 'eqp' });
		this.visitedService.addVisit({ eqp: 'foo' });
		this.visitedService.addVisit({ foo: 'hard' });
		console.log(this.visitedService.visitSnap);
		console.log(this.visitedService.getChain('foo'));
	}
}
