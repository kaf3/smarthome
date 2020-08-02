import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacade } from '@store/auth';
import { Observable, Subject } from 'rxjs';
import { UserLoggedIn } from '@models/user';
import { take, takeUntil } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	form: FormGroup;
	hide = true;
	public user$: Observable<UserLoggedIn | null>;
	private destroy$ = new Subject();
	constructor(private readonly authFacade: AuthFacade, private formBuilder: FormBuilder) {}

	get email(): AbstractControl | null {
		return this.form?.get('email');
	}

	get password(): AbstractControl | null {
		return this.form?.get('password');
	}

	ngOnInit(): void {
		this.user$ = this.authFacade.user$;
		this.form = this.formBuilder.group({
			email: [
				'test@test.test',
				[Validators.required.bind(Validators), Validators.email.bind(Validators)],
			],
			password: [
				'',
				[Validators.required.bind(Validators), Validators.minLength(6).bind(Validators)],
			],
		});
	}

	submit(): void {
		if (this.form.valid) {
			this.authFacade.redirectUrl$
				.pipe(take(1), takeUntil(this.destroy$))
				.subscribe((redirectUrl) =>
					this.authFacade.logIn(
						{ email: this.email?.value, password: this.password?.value },
						redirectUrl,
					),
				);
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
