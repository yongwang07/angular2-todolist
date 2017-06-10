import {Component, Input, Output, ViewEncapsulation, 
    EventEmitter, ChangeDetectionStrategy, SimpleChange, OnChanges} from '@angular/core';
import {Editor} from '../editor/editor';

@Component({
  selector: 'ngc-auto-complete',
  host: {
    class: 'auto-complete'
  },
  moduleId: module.id,
  templateUrl: 'auto-complete.html',
  styleUrls: ['auto-complete.css'],
  encapsulation: ViewEncapsulation.None
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoComplete implements OnChanges {
  @Input() items: string[];
  @Input() selectedItem: string;
  @Output() selectedItemChange = new EventEmitter();
  @Output() itemCreated = new EventEmitter();
  filter: string;
  exactMatch: boolean;
  showCallout: boolean;
  filteredItems: string[];
  previousSelectedItem: string;
  constructor() {
    this.filteredItems = [];
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (this.items && this.selectedItem) {
      this.filterItems(this.selectedItem);
    }
  }

  filterItems(filter: string) {
    this.filter = filter || '';
    this.filteredItems = this.items
      .filter((item) => item.toLowerCase().indexOf(this.filter.toLowerCase().trim()) !== -1)
      .slice(0, 10);
    this.filteredItems.sort();
    this.exactMatch = this.items.includes(this.filter);
  }

  selectItem(item: string) {
    this.selectedItemChange.next(item);
  }

  createItem(item: string) {
    this.itemCreated.next(item);
  }

  onEditModeChange(editMode: boolean) {
    if (editMode) {
      this.showCallout = true;
      this.previousSelectedItem = this.selectedItem;
    } else {
      this.showCallout = false;
    }
  }

  onEditableInput(content: string) {
    this.filterItems(content);
  }

  onEditSaved(content: string) {
    if (content === '') {
      this.selectedItemChange.next(null);
    } else if (content !== this.selectedItem && !this.items.includes(content)) {
      this.itemCreated.next(content);
    }
  }

  onEditCanceled() {
    this.selectedItemChange.next(this.previousSelectedItem);
  }
}