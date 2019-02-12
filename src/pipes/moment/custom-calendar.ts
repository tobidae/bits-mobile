import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'customMomentCalendar'
})
export class CustomCalendarPipe implements PipeTransform {
  transform(value: Date | moment.Moment, ...args: any[]): any {
    return moment(value).calendar(null, {
      sameDay: 'LT',
      lastDay: '[Yesterday]',
      lastWeek: 'ddd',
      sameElse: 'MMM Do'
    });
  }
}
