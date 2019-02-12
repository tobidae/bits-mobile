import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAvailable',
})
export class IsAvailablePipe implements PipeTransform {
  transform(value: any[], ...args) {
    let newVal = [];
    let bool = args[0];

    // Loop through an array of values
    for (const index in value) {
      let item = value[index];
      // If the item's isAvailable value is equal to true or false,
      // Push the item to the new Array and return that array
      if (item.isAvailable === bool) {
        newVal.push(item);
      }
    }
    return newVal;
  }
}
