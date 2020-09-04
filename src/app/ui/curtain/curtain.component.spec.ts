import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurtainComponent } from './curtain.component';

describe('CurtainComponent', () => {
	let component: CurtainComponent;
	let fixture: ComponentFixture<CurtainComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CurtainComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CurtainComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
