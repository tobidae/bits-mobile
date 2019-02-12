import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {
  transform(value: Date | moment.Moment, ...args: any[]): any {
    if (Math.abs(moment().diff(value)) < 55000) { // 1000 milliseconds
      return 'just now';
    }
    return moment(value).fromNow();
  }
}