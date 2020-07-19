import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
	},
];

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatToolbarModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		ReactiveFormsModule,
	],
})
export class LoginModule {}
