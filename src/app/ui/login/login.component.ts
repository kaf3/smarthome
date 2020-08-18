import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	form: FormGroup;
	hide = true;
	private destroy$ = new Subject();
	constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

	get email(): AbstractControl | null {
		return this.form?.get('email');
	}

	get password(): AbstractControl | null {
		return this.form?.get('password');
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			email: [
				'nekit.97@bk.ru',
				[Validators.required.bind(Validators), Validators.email.bind(Validators)],
			],
			password: [
				'123456',
				[Validators.required.bind(Validators), Validators.minLength(6).bind(Validators)],
			],
		});
	}

	submit(): void {
		if (this.form.valid) {
			this.authService.login(this.email?.value, this.password?.value);
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
