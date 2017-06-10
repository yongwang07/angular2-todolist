import {Pipe, Inject} from '@angular/core';
import {TagsService} from '../tags/tags-service';

@Pipe({
  name: 'tags',
  pure: false
})
export class TagsPipe {
  constructor(private tagsService: TagsService) {}

  transform(value: string) {
    if (typeof value !== 'string') {
      return value;
    }
    return this.tagsService.parse(value);
  }
}