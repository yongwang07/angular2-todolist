import {Component, Input, ViewEncapsulation, Inject, ElementRef, 
    Output, EventEmitter, HostBinding, OnInit, OnChanges, SimpleChange} from '@angular/core';
import {TagsService} from '../tags/tags-service';
import {Tag} from '../models';
import {Subscription} from 'rxjs/Rx'; 

@Component({
    selector: 'ngc-tags-select',
    host: {
        class: 'tags-select'
    },
    moduleId: module.id,
    templateUrl: 'tags-select.html',
    styleUrls: ['tags-select.css'],
    encapsulation: ViewEncapsulation.None
})
export class TagsSelect implements OnInit, OnChanges {
  @Input() filter: string;
  @Input() limit: number;
  @Input() position: {top: number, left: number};
  @Output() tagSelected = new EventEmitter();
  filteredTags: Tag[];
  tags: Tag[];
  tagsSubscription: Subscription;

  @HostBinding('style.display')
  get isVisible() {
    if (this.filter[0] === '#' && this.filteredTags.length > 0) {
      return 'block';
    } else {
      return 'none';
    }
  }

  @HostBinding('style.top')
  get topPosition() {
    return this.position ? `${this.position.top}px` : 0;
  }

  @HostBinding('style.left')
  get leftPosition() {
    return this.position ? `${this.position.left}px` : 0;
  }

  constructor(private tagsService: TagsService) {
    this.filteredTags = [];
    this.filter = '';
  }

  ngOnInit() {
    this.tagsSubscription = this.tagsService.change.subscribe((tags) => {
      this.tags = tags;
      this.filterTags();
    });
  }

  onTagClick(tag: Tag) {
    this.tagSelected.next(tag);
  }

  filterTags() {
    const filter = this.filter.slice(1).toLowerCase();
    this.filteredTags = this.tags
      .filter((tag) => {
        return tag.textTag.indexOf(filter) !== -1 ||
          tag.title.toLowerCase().indexOf(filter) !== -1;
      })
      .slice(0, this.limit);
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (this.tags && (changes.filter || changes.limit)) {
        this.filterTags();
    }
  }

  ngOnDestroy() {
    this.tagsSubscription.unsubscribe();
  }
}