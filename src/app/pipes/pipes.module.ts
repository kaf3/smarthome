import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitPipe} from './unit.pipe';

@NgModule({
    declarations: [UnitPipe],
    imports: [CommonModule],
    exports: [UnitPipe],
    providers: [UnitPipe],
})
export class PipesModule {}
