import { TestBed } from '@angular/core/testing';

import { HttpCommandsService } from './http-commands.service';

describe('HttpCommandsService', () => {
	let service: HttpCommandsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(HttpCommandsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
