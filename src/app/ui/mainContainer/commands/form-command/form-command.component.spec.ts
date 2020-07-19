import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCommandComponent } from './form-command.component';

describe('FormCommandComponent', () => {
	let component: FormCommandComponent;
	let fixture: ComponentFixture<FormCommandComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FormCommandComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FormCommandComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
