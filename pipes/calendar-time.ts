import {Pipe} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'calendarTime'
})
export class CalendarTimePipe {
  transform(value: any) {
    if (value && (value instanceof Date || typeof value === 'number')) {
      return moment(value).calendar();
    } else return value;
  }
}