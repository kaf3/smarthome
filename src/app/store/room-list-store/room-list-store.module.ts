import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { roomsReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { RoomListEffects } from './effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ROOMLIST_FEATURE_KEY } from './state';
import { RoomListFacade } from './facade';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature(ROOMLIST_FEATURE_KEY, roomsReducer),
		EffectsModule.forFeature([RoomListEffects]),
		MatSnackBarModule,
	],
})
export class RoomListStoreModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: RoomListStoreModule,
			providers: [RoomListFacade],
		};
	}
}
