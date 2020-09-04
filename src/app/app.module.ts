import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootStoreModule } from '@store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app.routing.module';
import { SharedModule } from './shared/shared.module';
import { MainContainerModule } from './ui/mainContainer/mainContainer.module';
import { LoadingComponent } from './ui/loading/loading.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EditComponent } from './ui/edit/edit.component';
import { CurtainComponent } from './ui/curtain/curtain.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
	declarations: [
		AppComponent,
		LoadingComponent,
		NotFoundComponent,
		EditComponent,
		CurtainComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RootStoreModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MainContainerModule,
		SharedModule.forRoot(),
		MatProgressBarModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
		MatButtonModule,
		MatCardModule,
		PortalModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
