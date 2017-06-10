import {Component, ViewEncapsulation, Input} from '@angular/core';
import {Tab} from './tab';

@Component({
  selector: 'ngc-tabs',
  host: {
    class: 'tabs'
  },
  templateUrl: 'tabs.html',
  styleUrls: ['tabs.css'],
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None
})
export class Tabs {
  @Input() items: {title: string, link: string[]};
}