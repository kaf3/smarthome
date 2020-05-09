import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomComponent} from './room.component';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RoomRoutingModule} from './room.routing.module';
import {MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {EquipmentModule} from './equipment/equipment.module';
import {PipesModule} from '@pipes';
import {EffectsModule} from '@ngrx/effects';
import {RoomUiEffects} from './room.ui.effects';

@NgModule({
    declarations: [RoomComponent],
    imports: [
        CommonModule,
        EquipmentModule,
        RoomRoutingModule,
        MatToolbarModule,
        MatRippleModule,
        MatCardModule,
        PipesModule,
        EffectsModule.forFeature([RoomUiEffects]),
    ],
    exports: [RouterModule],
})
export class RoomModule {}
