import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {
  transform(value: Date | moment.Moment | any, ...args: any[]): any {
    if (!value) return 'never';
    if (Math.abs(moment().diff(value)) < 55000) { // 1000 milliseconds
      return 'just now';
    }
    if (String(value).length <= 10)
      value = value*1000;
    return moment(value).fromNow();
  }
}
