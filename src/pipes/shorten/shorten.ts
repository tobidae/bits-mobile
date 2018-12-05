import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  /**
   * Takes a value and shortens it by a length
   */
  transform(value: string, length: number = 20) {
    if (value.length > length) {
      value = value.substring(0, length) + '...';
    }
    return value;
  }
}
