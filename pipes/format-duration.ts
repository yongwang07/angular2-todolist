import {Pipe, Inject} from '@angular/core';
import {formatDuration} from '../utils/time-utility';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe {
  transform(value: any) {
    if (value == null || typeof value !== 'number') {
      return value;
    }
    return formatDuration(value);
  }
}