import {Pipe} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  // Specifying the name to be used within templates
  name: 'fromNow'
})
// Our pipe will transform dates and timestamps to relative times using Moment.js
export class FromNowPipe {
  // The transform method will be called when the pipe is used within a template
  transform(value: any) {
    if (value && (value instanceof Date || typeof value === 'number')) {
      return moment(value).fromNow();
    } else return value;
  }
}