import {Pipe} from '@angular/core';
import {limitWithEllipsis} from '../models';

@Pipe({
  name: 'limitWithEllipsis'
})
export class LimitWithEllipsisPipe {
  transform(value: string, limit = 20) {
    return limitWithEllipsis(value, limit);
  }
}