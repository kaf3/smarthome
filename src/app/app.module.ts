import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootStoreModule } from '@store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app.routing.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './ui/login/login.module';
import { MainContainerModule } from './ui/mainContainer/mainContainer.module';
import { LoadingComponent } from './ui/loading/loading.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
	declarations: [AppComponent, LoadingComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		RootStoreModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MainContainerModule,
		LoginModule,
		SharedModule.forRoot(),
		MatProgressBarModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
