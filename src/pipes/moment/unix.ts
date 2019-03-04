import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentUnix'
})
export class UnixPipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    let [format] = args;
    if (String(value).length >= 13)
      value = Number.parseInt((value/1000).toFixed(0));
    return moment.unix(value).format(format);
  }
}
