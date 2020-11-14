import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mapper',
})
export class MapperPipe implements PipeTransform {
	transform(value: unknown, callback: Function, ...args: any): unknown {
		return callback ? callback.apply(this, [value, ...args]) : value;
	}
}
