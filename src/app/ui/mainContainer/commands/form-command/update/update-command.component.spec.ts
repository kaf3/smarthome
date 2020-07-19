import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommandComponent } from './update-command.component';

describe('UpdateCommandComponent', () => {
	let component: UpdateCommandComponent;
	let fixture: ComponentFixture<UpdateCommandComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UpdateCommandComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UpdateCommandComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
