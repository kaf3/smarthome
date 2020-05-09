import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiComponent} from './ui.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {UiRoutingModule} from './ui.routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
    declarations: [UiComponent],
    exports: [UiComponent],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatListModule,
        UiRoutingModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatProgressBarModule,
    ],
})
export class UiModule {}
