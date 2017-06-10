import {Pipe, Inject} from '@angular/core';
import {formatDuration} from '../utils/time-utility';

@Pipe({
  name: 'formatEfforts'
})
export class FormatEffortsPipe {
  transform(value: {effective: number, estimated: number}) {
    if (value == null || typeof value !== 'object') {
      return value;
    }
    return `${formatDuration(value.effective) || 'none'} of ${formatDuration(value.estimated) || 'un-estimated'}`;
  }
}