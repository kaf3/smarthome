import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootStoreModule } from '@store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app.routing.module';
import { UiModule } from './ui/ui.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		RootStoreModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		UiModule,
		SharedModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
