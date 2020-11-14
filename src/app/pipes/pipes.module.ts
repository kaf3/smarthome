import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitPipe } from './unit.pipe';
import { MapperPipe } from './mapper.pipe';

@NgModule({
	declarations: [UnitPipe, MapperPipe],
	imports: [CommonModule],
	exports: [UnitPipe, MapperPipe],
	providers: [UnitPipe, MapperPipe],
})
export class PipesModule {}
