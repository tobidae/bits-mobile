import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAvailable',
})
export class IsAvailablePipe implements PipeTransform {
  transform(value: any[], ...args) {
    let newVal = [];
    let bool = args[0];

    for (const index in value) {
      let item = value[index];
      if (item.isAvailable === bool) {
        newVal.push(item);
      }
    }
    return newVal;
  }
}
