import {Injectable, Inject} from '@angular/core';
import {ReplaySubject} from 'rxjs/Rx';
import {Tag, IProject} from '../models';
import {generateTag} from './generate-tag';
import * as Data from '../initial-data';

function replaceAll(target: string, search: string, replacement: string) {
  return target.split(search).join(replacement);
}

function findTags(str: string) {
  const result = [];
  const regex = /#[\w\/-]+/g;
  let match;
  while (match = regex.exec(str)) {
    result.push(match[0]);
  }
  return result;
}

@Injectable()
export class TagsService {
    change: ReplaySubject<Tag[]>;
    projects: IProject[];
    tags: Tag[];
    constructor() {
        this.change = new ReplaySubject(1);
        this.projects = (Data.default as IProject[]).slice(0, 3);
        this.initializeTags();
    }
    
    initializeTags() {
        this.tags = this.projects.map(generateTag);
        this.change.next(this.tags);
    }

    renderTag(tag: Tag|any) {
        if (tag instanceof Tag) {
            return `<a class="tags__tag tags__tag--${tag.type}" href="javascript:evil()">${tag.title}</a>`;
        } else {
            return tag;
        }
    }
    
    parseTag(textTag: string) {
        return this.tags.find((tag) => tag.textTag === textTag) || textTag;
    }

    parse(value: string) {
        const tags = findTags(value);
        tags.forEach((tag) => value = replaceAll(value, tag, this.renderTag(this.parseTag(tag))));
        return value
    }
}